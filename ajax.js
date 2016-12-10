
$ajax = {
  request: function(opts) {
    opts = opts || {};
    console.log('$ajax.request()', opts.url);
    if (opts.url && opts.method) {
      opts.method = opts.method || 'GET';
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log('DONE', xhr.responseText);
          var data = xhr.responseText;
          if (opts.dataType.toLowerCase() === 'json') {
            try {
              data = JSON.parse(data);
            } catch (e) {};
          }
          return opts.success && opts.success(data);
        }
      }
      xhr.open(opts.method, opts.url, true);
      xhr.send(null);
    }
  }
};

['get', 'post', 'put', 'delete'].forEach(function(method) {

  $ajax[method] = function(opts) {
    opts.method = method.toUpperCase();
    return $ajax.request(opts);
  }

});;