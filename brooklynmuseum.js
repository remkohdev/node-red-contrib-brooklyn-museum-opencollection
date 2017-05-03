module.exports = function(RED) {
    
    function CollectionNode(config) {

        RED.nodes.createNode(this, config);

        var node = this;
        var credentials = this.credentials;

        node.on('input', function(msg) {

            console.log("apikey: "+ credentials.apikey);
            console.log("name: "+ node.name);

            var http = require("https");
            var options = {
              "method": "GET",
              "hostname": "www.brooklynmuseum.org",
              "path": "/api/v2/collection/",
              "headers": {
                "api_key": credentials.apikey
              }
            };
            var req = http.request(options, function (res) {
              var chunks = [];
              res.on("data", function (chunk) {
                chunks.push(chunk);
              });
              res.on("end", function () {
                var body = Buffer.concat(chunks);
                var res = JSON.parse(body.toString());
                msg.payload = res.data;
                node.send(msg);
              });
            });
            req.end();

        });
    }
    RED.nodes.registerType("collection", CollectionNode, {
      credentials: {
         apikey: {type:"text"}
      }
    });
}