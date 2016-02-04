exports.myLoggingMiddleware = function(req, res) {
  var url = req.url;
  var method = req.method;

  console.log("%s request at %s", method, url);
};