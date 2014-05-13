var http = require("http");
var fs = require('fs');
var xml2js = require('xml2js');
var reader = require ("buffered-reader");
var cache = require('memory-cache');
var xslt4node = require('xslt4node');
var hash = require('hash-string');
var promise = require("bluebird");
var _ = require('underscore');
var mongo = require('mongodb');

var global = [];

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

    case("/model"):
    
    getJsonFromFile(function(res){
      finishRequest(response,JSON.stringify(mapToModel(res), null, 4));
    });
    break;

    case ("/xml"):
      gettingProcess([mongo.ObjectID("53724aa42579366763512a60")], function(res){
        var builder = new xml2js.Builder();

        var json = {"Meta":"", "element": res };
        var j = JSON.parse(  JSON.stringify(json));

        var xml = builder.buildObject( j );
        finishRequest(response, xml);
      });
    break;

    case ("/save"):
      //storing data into mongo
      //27017 mongoDB v2.6
      console.log("in url");
      mongo.MongoClient.connect("mongodb/:/192.168.212.139:27017/poc_mapping", function(err, db) {

        if(err) { console.log(err);finishRequest(response, "Error: look at node.js log please.");}
        else
        {
          console.log("In else");
          getJsonFromFile(function(res){
            console.log("from file");
            db.collection("poc_mapping").insert(mapToModel(res).element, function(err, result){
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
      gettingProcess([mongo.ObjectID("536bd9b8711053a51c856314")], function(result){
            var string = "[";
            for(var i=0;i<result.length; i++)
            {
              string += JSON.stringify(result[i], null, 4);
              string += ",\n"
            }
            finishRequest(response, string+"]");
          });
    break;

    default:
      finishRequest(response, "404 Error");
  }
}

var gettingProcess = function(ids, callback){
  mongo.MongoClient.connect("mongodb://192.168.212.139:27017/poc_mapping", function(err, db) {
    if(err) {console.log(err); finishRequest(response, "Error: see nodejs log.")}
    else
    {
      getProcess(ids, db.collection("poc_mapping"), [], callback);
    }
  });
}



//parameter id. eg id = "31643623463243nn2"
//paramater db. eg db = 'db.collection("poc_mapping")'
function getProcess(id, db, append, callback)
{
  var or = [];
  var ids = [];

  var idLength = id.length;
  for(var p = 0; p<idLength; p++){
    or.push({"processId" : id[p]});
  }

  mongoFind({$or: or}, db, function(result){
    var length = result.length;   
    for(var i=0; i<length; i++) {
      append.push(result[i]);
      if(result[i].type == "callActivity") {
        var len = result[i].value.length;
        for(var j=0; j < len ; j++){
          var processId = result[i].value[j].$.calledElement;
          ids.push( processId );
        }
      }      
    }

    if (ids.length > 0){
      findByMeta(ids, db, append, function(idsarray){
        getProcess(idsarray, db, append, callback);
      })
    } else{
      db.close();
      callback(append);
    }
  });
}

var mongoFind = function(options, db, callback)
{
  db.find(options).toArray(function(err, result){
    callback(result);
  });
}

var findByMeta = function(processesID, db, append, callback){
  var idss = [];
  for(var d = 0;d<processesID.length; d++){
    idss.push({"processMeta.id": processesID[d]});
  }
  mongoFind({$or: idss}  , db, function(res){
    var idArray = [];
    for(var i =0; i<res.length; i++){
      idArray.push(res[i].processId);
    }
    callback(idArray);
  });
}

var mapToModel = function(res){
  /*if(cache.get("model") != null){
    console.log("returned from cache");
    return cache.get("model");
  }*/

  var processes = res.definitions.process;
  var diagrams = res.definitions.BPMNDiagram; 
  var documents = [];
  for(var prop in processes) {
    if(processes.hasOwnProperty(prop)){
      var propertyNames = Object.getOwnPropertyNames(processes[prop]);
      var  processId = new mongo.ObjectID();
      for(var property in processes[prop]){
        var mapping ={};
        if(property==="$"){
          mapping.processId = processId;
          mapping.processMeta =  processes[prop][property];
          documents.push(mapping);
        }else{
        //shapes
          mapping.shapeId = new mongo.ObjectID();
          mapping.processId = processId;
          mapping.hash = hash.hashCode(new Date().toString());
          mapping.type = property;
          mapping.value = processes[prop][property];
          var bpmnItem = find(processes[prop][property], function(x) {return x;});
          var bpmnId = bpmnItem.$.id;
            if(bpmnId!=undefined){
              var returnVal;
              find(diagrams,function(x){
                if( x.$ != undefined && x.$.bpmnElement != undefined ){
                  if(x.$.bpmnElement===bpmnId){
                    //console.log("element found: " + JSON.stringify(x,null,4));
                    returnVal = x;
                  }}});
              if(returnVal!=null){
                mapping.diagram = returnVal;
              }
              
          }
          documents.push(mapping);
        }
      }
    }
    //cache.put("model", {"Meta":"", "element": documents});
    return {"Meta":"", "element": documents}; 
  }
}

function find(items,f) {
    for(var key in items) { 
        var elem = items[key]; 
        if (f(elem)) { 

          return elem;
        }
        if(typeof elem === "object") { 
            find(elem,f); // call recursively
        }
    }
}

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