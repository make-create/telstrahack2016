const AWS = require('aws-sdk');
const sns = new AWS.SNS({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
    
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err || JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    });
    
    var body = {};
    
    console.log('event.body', event.body)
    
    if (event.httpMethod !== 'POST')
        return done(`Unsupported method "${event.httpMethod}", please use POST.`);
    
    try {
        body = JSON.parse(event.body);
    } catch (err) {
       return done('Please pass in some JSON in the body of your request with a "message" property.');
    }

    if (!body.message) 
        return done('Please pass in some JSON in the body of your request with a "message" property.');


    var publishParams = { 
      TopicArn : "arn:aws:sns:us-east-1:412359335753:notify-parent",
      Message: body.message || "Hello, we haven't heard back from Xavier for a while, check out this url for more info: http://bit.ly/2hfoV39." 
    };

    sns.publish(publishParams, function publishCallback(err, data) {
        if (err) {
            return done(err.message);
        }
      console.log("published message");
      done(null, data);
    });   
    
};