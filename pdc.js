var http = require("http");
var fs = require('fs');
var xml2js = require('xml2js');
var reader = require ("buffered-reader");
var cache = require('memory-cache');
var xslt4node = require('xslt4node');
var js2xmlparser = require("js2xmlparser");
var fs = require('fs');

function onRequest(request, response) {

  switch (request.url){
   
    case ("/"):
      getMapping(function(res){
        finishRequest(  response , JSON.stringify(res) );
      });
    break;

    case ("/xml"):

      var json = readJson(function(data){
        //console.log(js2xmlparser("", data));
        //var result = js2xmlparser("", json);
        

        var builder = new xml2js.Builder();
        var xml = builder.buildObject( JSON.parse(data) );
        finishRequest(  response ,  xml );
        //finishRequest(  response ,  js2xmlparser("", JSON.parse(data) ) );
        /*var config = {
          xsltPath: 'discount.xsl',
          sourcePath: 'order.xml',
          result: 'result.xml',
          props: {
            indent: 'yes'
          }
        };
        
        xslt4node.transform(config, function (err) {
            if (err) {
                console.log(err);
            }
            finishRequest(  response ,xml );
        });*/

      });
    

    break;

    default:
      finishRequest(response, "404 Error");
      break;
  }

};

var getMapping = function(callback){

      var parser = new xml2js.Parser();
      fs.readFile('process.bpmn', function(err, data) {
          parser.parseString(data, function (err, result) {
            var jsonFile = JSON.stringify(result);
            var newResult = JSON.parse(jsonFile);
            cache.put("mapping", newResult);
            callback( newResult );
          });
      });
    
}

var readJson = function(callback){
  fs.readFile('jsonparsing.js', function(err, data) {
      callback(data);
    });
}

function finishRequest(response, message){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(message);
  response.end();
}

var server = http.createServer(onRequest);
server.listen(8082);