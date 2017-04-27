var fs = require('fs');

fs.open(
  'info.txt', 'r', //callback
  function(err, handle) {
    var buf = new Buffer(100000);
    fs.read(
      handle, buf, 0, 100000, null,
      function(err, length) {
        console.log(buf.toString('utf8', 0, length));
        fs.close(handle, function() {/* Still don't care */ });
      }
    );
  }
);
