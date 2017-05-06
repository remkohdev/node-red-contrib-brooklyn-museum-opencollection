module.exports = function(RED) {
    
    function ExhibitionNode(config) {
        RED.nodes.createNode(this, config);

        this.exhibitionid = config.exhibitionid;
        var node = this;
        var credentials = this.credentials;      

        node.on('input', function(msg) {

            console.log("apikey: "+ credentials.apikey);
            console.log("name: "+ node.name);
            console.log("exhibitionid: "+ node.exhibitionid);
            console.log("msg.payload.exhibitionid: "+msg.payload.exhibitionid);

            if(msg.payload.exhibitionid){
              var eid = msg.payload.exhibitionid;
              if (typeof parseInt(eid) === "number"){
                // is number
                node.exhibitionid = parseInt(eid);
              }else{
                // invalid exhibitionid
                console.log("Error: invalid exhibitionid in msg.payload");
              }
            }
            
            var path="/api/v2/exhibition";
            if(node.exhibitionid){
              path=path+"/"+node.exhibitionid;
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
    RED.nodes.registerType("exhibition", ExhibitionNode, {
      credentials: {
         apikey: {type:"text"}
      }
    });
}