const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();

//Cors is useful for every route but i'm only using it for POST here
// const cors = require ('cors');
// app.use(cors());
// app.set('trust proxy', true);

//Body Parser settings built into Express so we can see req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post("/vehicles/:id/engine", (req,res) =>{
    let id = req.params.id
    let request = req.body
    let comHash = {
      "START" : "START_VEHICLE",
      "STOP"  : "STOP_VEHICLE"
    }
    if(comHash[request.action] == undefined){
      res.send('Please send a correct command')
    }
    else{
      GMCall(id, 'startStop', function(data){
        if(data.status == undefined){
          res.send(data)
        }
        else if(data.status == 404){
          //status code is sent as a string so using ==
          let error ={error: 'Vehicle ID was not found, please try another ID'}
          res.send(error)
        }
        else{
          //ternary to translate GM api to Smartcar
          let stat = data.actionResult.status == "EXECUTED" ? "success" : "error"
          let engineRes = {status: stat }
          res.send(engineRes)
        }
      }, comHash[request.action])
    }
  })
  
  module.exports = app;