var http = require("http");
var fs = require('fs');
var xml2js = require('xml2js');
var reader = require ("buffered-reader");
var cache = require('memory-cache');
var xslt4node = require('xslt4node');
var enumerable = require('linq');

function onRequest(request, response) {

	var config = {
		xsltPath: 'discount.xsl',
		sourcePath: 'order.xml',
		result: 'result.xml',
		params: {
			adiscount: '2014/08/02'
		},
		props: {
			indent: 'yes'
		}
	};

  switch (request.url){
    case ("/"):
      getJsonFromFile(function(res){
        finishRequest(response,JSON.stringify(res, null, 4));
      });
    break;
    case ("/map"):
      getJsonFromFile(function(res){
        enumerable.From(res).where(function(x){return x.task});


        finishRequest(response,JSON.stringify(res, null, 4));
      });
    break;
    case ("/xml"):
		xslt4node.transform(config, function (err) {
		    if (err) {
		        console.log(err);
		    }
		    finishRequest(response , "done" );
		});
    break;
    default:
      finishRequest(response, "404 Error");
      break;
  }

};

function nameProcessor(name) {
  console.log(name);
  console.log("/n");
  return name;//.replace('bpmn2:', '');
}

var getJsonFromFile = function(callback){
      if (cache.get("jsonResult")!=null){
       callback(cache.get("jsonResult"))
       console.log("element picked up from cache");
      }
      else{
        var parser = new xml2js.Parser();
        fs.readFile('process.bpmn', function(err, data) {
          parser.parseString(data,{stripPrefix: "true"},
            function (err, result) {
            //if(err=!null){
              console.log("2"); //finishRequest(response, "404 Error");
            //}

            var jsonFile = JSON.stringify(result);
            var newResult = JSON.parse(jsonFile);
            cache.put("jsonResult", newResult);
            callback( newResult );
          });
        });
      }
}

function finishRequest(response, message){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(message);
  response.end();
}

var server = http.createServer(onRequest);
server.listen(8082);
console.log("Server listening...");