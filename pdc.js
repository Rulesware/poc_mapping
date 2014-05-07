var http = require("http");
var fs = require('fs');
var xml2js = require('xml2js');
var reader = require ("buffered-reader");
var cache = require('memory-cache');
var xslt4node = require('xslt4node');
var hash = require('hash-string');

var _ = require('underscore');
//var linq = require('node-linq').LINQ;

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
        var processes = res.definitions.process;
        var diagrams = res.definitions.BPMNDiagram;
        var pl = processes.length;
        var documents = [];
        for(var i=0; i<pl; i++)
        {
          //creating pdc processes
          var temp= {};
          var processID = "process-"+new Date().getTime()+"-"+(Math.random()*10000);
          temp.id = processID;
          temp.processMeta = processes[i].$;
          temp.hash = hash.hashCode(new Date().toString());
          temp.bpmnDiagram = diagrams[i].$;
          delete diagrams[i].$;
          temp.bpmnPlane = diagrams[i].BPMNPlane[0].$;
          delete diagrams[i].BPMNPlane[0].$;
          documents.push(temp);
          temp = {};

          //creating pdc shapes
          delete processes[i].$;
          for(key in processes[i]) 
          {
            //general info
            var length = processes[i][key].length;
            var root = processes[i][key];
            //creating container of key type
            temp.id = "container-"+new Date().getTime()+"-"+(Math.random()*10000);
            temp.processID = processID;
            temp.type = key;
            temp.list = [];
            var temp2 = {};
            for(var x = 0; x<length; x++)
            {
              var temporal = root[x].$;
              delete root[x].$;
              temp2 = root[x];
              temp2.shapeMeta = temporal;
              for(key in diagrams[i].BPMNPlane[0])
              {
                var localRoot = diagrams[i].BPMNPlane[0][key];
                var typesLenght = localRoot.length;
                var z=0;
                var flag = true;
                for(z; z<typesLenght; z++)
                {
                  if(localRoot[z].$)
                    if(localRoot[z].$.bpmnElement == temp2.shapeMeta.id)
                      { flag = false; break;}
                }
                if(flag)
                  continue;
                temp2.DiagramMeta = localRoot[z].$;
                delete localRoot[z].$;
                for(k in localRoot[z])
                  temp2[k] = localRoot[z][k];
                break;
              }
              temp.list.push(temp2);
              temp2 = {};
            }
            documents.push(temp);
            temp = {};
          }
        }
        finishRequest(response,JSON.stringify(documents, null, 4));
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

var getJsonFromFile = function(callback){
      if (cache.get("jsonResult")!=null){
       callback(cache.get("jsonResult"))
       console.log("element picked up from cache");
      }
      else{
        var parser = new xml2js.Parser({tagNameProcessors: [nameProcessor],attrNameProcessors: [nameProcessor]});

        fs.readFile('process.bpmn', function(err, data) {
          parser.parseString(data,
            function (err, result) {
            

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
console.log("server started...");
