const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();

app.get("/vehicles/:id/battery", (req,res) =>{
    let id = req.params.id
    GMCall(id, 'energy', function(data){
      if(data.status == undefined){
        res.send(data)
      }
      if(data.status == 404){
        //status code is sent as a string so using ==
        res.send('Vehicle ID was not found, please try another ID')
      }
      else{
        let info = data.data
        let fuelRes = {percent: info.batteryLevel.value}
        res.send(fuelRes)
      }
    })
  
  })

  module.exports = app;