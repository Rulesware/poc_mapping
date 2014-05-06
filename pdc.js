var http = require("http");
var fs = require('fs');
var xml2js = require('xml2js');
var reader = require ("buffered-reader");
var cache = require('memory-cache');
//var xslt4node = require('xslt4node');

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
      getMapping(function(res){
        finishRequest(  response , JSON.stringify(res) );
      });
    break;

    case ("/xml"):
		xslt4node.transform(config, function (err) {
		    if (err) {
		        console.log(err);
		    }
		    finishRequest(  response , "done" );
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

function finishRequest(response, message){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(message);
  response.end();
}

var server = http.createServer(onRequest);
server.listen(8082);