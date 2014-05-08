var http = require("http");
var fs = require('fs');
var xml2js = require('xml2js');
var reader = require ("buffered-reader");
var cache = require('memory-cache');
var xslt4node = require('xslt4node');
var hash = require('hash-string');
var q= require("q");
var _ = require('underscore');
var mongo = require('mongodb');

var global = "";
function onRequest(request, response) {

	var config = {
		xsltPath: 'discount.xsl',
		source: 'order.xml',
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
      //our mapping model
      getJsonFromFile(function(res){
        finishRequest(response,JSON.stringify(converter(res), null, 4));
      });
    break;

    case ("/xml"):
		  //benjamin: obtener el proceso por ID de la base de datos. Y mostrar el xml resultante
    break;

    case ("/save"):
      //storing data into mongo
      //27017 mongoDB v2.6
      console.log("in url");
      mongo.MongoClient.connect("mongodb://192.168.212.139:27017/poc_mapping", function(err, db) {

        if(err) { console.log(err);finishRequest(response, "Error: look at node.js log please.");}
        else
        {
          console.log("In else");
          getJsonFromFile(function(res){
            console.log("from file");
            db.collection("poc_mapping").insert(res.element, function(err, result){
              if(err) {console.log(err);finishRequest(response, "Error: please look at the log.");}
              else 
              {
                console.log("push to the database done!.");
                finishRequest(response, "process inserted from cache to mongo db");
                db.close();
              }
            })

          });
        }
      });
    break;

    case ("/addShape"):
      //or something like this.
    break;

    default:
      finishRequest(response, "404 Error");
  }
}

var converter =  function(res){
  var processes = res.definitions.process;
  var diagrams = res.definitions.BPMNDiagram;
  var pl = processes.length;
  var documents = [];
  for(var i=0; i<pl; i++)
  {
    //creating pdc processes
    var mapping= {};

    var processID = new mongo.ObjectID();

    mapping.id = processID;
    mapping.processMeta = processes[i].$;
    mapping.hash = hash.hashCode(new Date().toString());
    mapping.bpmnDiagram = diagrams[i].$;
    delete diagrams[i].$;
    mapping.bpmnPlane = diagrams[i].BPMNPlane[0].$;
    delete diagrams[i].BPMNPlane[0].$;
    documents.push(mapping);
    mapping = {};
    //creating pdc shapes
    delete processes[i].$;
    for(key in processes[i]) 
    {
      //general info
      var length = processes[i][key].length;
      var root = processes[i][key];
      //creating container of key type

      mapping.id = new mongo.ObjectID();
      mapping.processID = processID;
      mapping.type = key;
      mapping.list = [];
      var shape = {};
      for(var x = 0; x<length; x++)
      {
        shape = root[x];
        shape.shapeMeta = root[x].$;
        delete root[x].$;
        for(key in diagrams[i].BPMNPlane[0])
        {
          var localRoot = diagrams[i].BPMNPlane[0][key];
          var typesLenght = localRoot.length;
          var z=0;
          var flag = true;
          for(z; z<typesLenght; z++)
          {
            if(localRoot[z].$)
              if(localRoot[z].$.bpmnElement == shape.shapeMeta.id)
                { flag = false; break;}
          }
          if(flag)
            continue;
          shape.DiagramMeta = localRoot[z].$;
          delete localRoot[z].$;
          for(k in localRoot[z])
            shape[k] = localRoot[z][k];
          break;
        }
        mapping.list.push(shape);
        shape = {};
      }
      documents.push(mapping);
      mapping = {};
    }
  }
  return {"Meta":"", "element": documents};  
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
   console.log("element picked up from cache");
   callback(cache.get("jsonResult"));
  }
  else{
    var parser = new xml2js.Parser({tagNameProcessors: [nameProcessor],attrNameProcessors: [nameProcessor]});
    fs.readFile('process.bpmn', function(err, data) {
      parser.parseString(data,
        function (err, result) {
        var jsonFile = JSON.stringify(result);
        var newResult = JSON.parse(jsonFile);
        cache.put("jsonResult", newResult);
        callback(newResult);
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
console.log(">>SERVER RUNNING");