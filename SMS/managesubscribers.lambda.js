const AWS = require('aws-sdk');
const sns = new AWS.SNS({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
    
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err || JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE'
        }
    });
    
    var topicArn = 'arn:aws:sns:us-east-1:412359335753:notify-parent',
        subscriptions = [],
        body;
    

    function listSubscriptionsCallback(err, data) {
        if (err) {
            return done(err.message);
        }
      console.log("subscription", data);
      subscriptions = subscriptions.concat(data.Subscriptions);
      if (data.NextToken) {
        sns.listSubscriptionsByTopic({
              TopicArn: topicArn, 
              NextToken: data.NextToken
            }, listSubscriptionsCallback); 
      } else {
        done(null, subscriptions);   
      }
    }
    
    switch(event.httpMethod) {
        case 'OPTIONS':
            done(null, '');
            break;
        case 'GET':
            sns.listSubscriptionsByTopic({
              TopicArn: topicArn
            }, listSubscriptionsCallback);  
            break;
        case 'POST':
            try { body = JSON.parse(event.body); } 
            catch (e) { return done(e); }
            if (body && body.Endpoint) {
                sns.subscribe({
                    TopicArn: topicArn,
                    Protocol: 'sms',
                    Endpoint: body.Endpoint
                }, function(err, data) {
                  if (err) console.log(err, err.stack);
                  else     console.log(data);           // successful response
                  done(err, data);
                });
            } else {
                done('Error: please pass in Endpoint');
            }
            break;
        case 'DELETE':
            try { body = JSON.parse(event.body); } 
            catch (e) { return done(e); }
            if (body && body.SubscriptionArn) {
                sns.unsubscribe({
                    SubscriptionArn: body.SubscriptionArn
                }, function(err, data) {
                  if (err) console.log(err, err.stack);
                  else     console.log(data);           // successful response
                  done(err, data);
                });
            } else {
                done('Error: please pass in Endpoint');
            }
            break;
        default: 
            done(`Unsupported method "${event.httpMethod}".`);
            break;
    }

 
    
};