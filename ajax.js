
$ajax = {
  request: function(opts) {
    opts = opts || {};
    console.log('$ajax.request()', opts);
    if (opts.url && opts.method) {
      opts.method = opts.method || 'GET';
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var data = xhr.responseText;
          if (opts.dataType.toLowerCase() === 'json') {
            try {
              data = JSON.parse(data);
            } catch (e) {};
          }
          return opts.success && opts.success(data, opts);
        }
      }
      xhr.open(opts.method, opts.url, true);
      xhr.send(typeof opts.data === 'object' ? JSON.stringify(opts.data) : String(opts));
    }
  }
};

['get', 'post', 'put', 'delete'].forEach(function(method) {

  $ajax[method] = function(opts) {
    opts.method = method.toUpperCase();
    return $ajax.request(opts);
  }

});;