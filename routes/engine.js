const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();

//Body Parser settings built into Express so we can see req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post("/vehicles/:id/engine", (req,res) =>{
    let id = req.params.id;
    let request = req.body;
    console.log('Post request recieved @ API: see below for details');
    console.log(request);
    console.log('################################');
    let comHash = {
      "START" : "START_VEHICLE",
      "STOP"  : "STOP_VEHICLE"
    };
    if(comHash[request.action] == undefined){
      res.send('Please send a correct command')
    }
    else{
      GMCall(id, 'startStop', function(data){
        if(data.status == undefined){
          res.send(data);
        }
        else if(data.status == 404){
          //status code is sent as a string so using ==
          console.log(`404 from GM: Vehicle ID was ${id}`);
          console.log('################################');
          let error ={error: 'Vehicle ID was not found, please try another ID'};
          res.send(error);
        }
        else{
          try{
            //ternary to translate GM api to Smartcar
            let stat = data.actionResult.status == "EXECUTED" ? "success" : "error";
            let engineRes = {status: stat };
            console.log('Reforming data from GM API: see below');
            console.log(engineRes);
            console.log('################################');
            console.log('End of API call');
            console.log('********************************');
            res.send(engineRes);
          }
          catch(err){
            console.log('Data reformation failed, see below for error logs');
            console.log(err);
            console.log('################################');
            console.log('End of API call');
            console.log('********************************');
            resErr = {404: 'Looks like recieved data was malformed or incomplete'};
            res.send(resErr);
        };
        };
      }, comHash[request.action]);
    };
  });
  
  module.exports = app;