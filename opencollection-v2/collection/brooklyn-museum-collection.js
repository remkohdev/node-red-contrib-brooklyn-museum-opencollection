module.exports = function(RED) {
    
    function CollectionNode(config) {
        RED.nodes.createNode(this, config);

        this.collectionid = config.collectionid;
        var node = this;
        var credentials = this.credentials;      

        node.on('input', function(msg) {

            console.log("apikey: "+ credentials.apikey);
            console.log("name: "+ node.name);
            console.log("collectionid: "+ node.collectionid);
            console.log(msg.payload);
            console.log("msg.payload.collectionid: "+msg.payload.collectionid);

            if(msg.payload.collectionid){
              var cid = msg.payload.collectionid;
              if (typeof parseInt(cid) === "number"){
                // is number
                node.collectionid = parseInt(cid);
              }else{
                // invalid collectionid
                console.log("Error: invalid collectionid in msg.payload");
              }
            }
            
            var path="/api/v2/collection";
            if(node.collectionid){
              path=path+"/"+node.collectionid;
            }
            var http = require("https");
            var options = {
              "method": "GET",
              "hostname": "www.brooklynmuseum.org",
              "path": path,
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

                var res = "";
                var bodyStr = body.toString();
                try { 
                  res = JSON.parse(bodyStr);
                } catch(err) { 
                  // find first html character in case of error
                  console.log(bodyStr);
                  var n = bodyStr.indexOf("<");
                  var bodyStr2 = bodyStr.substring(0,n);
                  res = JSON.parse(bodyStr2);
                } 

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