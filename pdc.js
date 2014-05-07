var http = require("http");
var fs = require('fs');
var xml2js = require('xml2js');
var reader = require ("buffered-reader");
var cache = require('memory-cache');
var xslt4node = require('xslt4node');
var q = require('q'); 

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
      getJsonFromFile().then(function(res){
            console.log("getJsonFromFile:resolved")
            var converterAsync = q(converter(res));
            converterAsync.then(function(result){
                console.log("converterAsync: "+result);
                finishRequest(response, "mapping done");
            })
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

var converter =  function(input){
  console.log("converter:resolved");
 
  return "test";
};
 


function nameProcessor(name) {
  var prefixMatch = new RegExp(/(?!xmlns)^.*:/);
  return  name.replace(prefixMatch, '');
}

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

var getJsonFromFile = function(){
  var deferred = q.defer();
      if (cache.get("jsonResult")!=null){
       console.log("element picked up from cache");
       deferred.resolve(cache.get("jsonResult"));
      }
      else{
        var parser = new xml2js.Parser({tagNameProcessors: [nameProcessor],attrNameProcessors: [nameProcessor]});

        fs.readFile('process.bpmn', function(err, data) {
          parser.parseString(data,
            function (err, result) {
            var jsonFile = JSON.stringify(result);
            var newResult = JSON.parse(jsonFile);
            cache.put("jsonResult", newResult);
            deferred.resolve(newResult);
          });
        });
      }
  return deferred.promise;  
}

function finishRequest(response, message){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(message);
  response.end();
}

var server = http.createServer(onRequest);
server.listen(8082);