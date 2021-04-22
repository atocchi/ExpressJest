const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();

app.get("/vehicles/:id/fuel", (req,res) =>{
    let id = req.params.id
    GMCall(id, 'energy', function(data){
      //this is the error handler for uncommon errors, mainly if the computer isn't connected to the internet
      if(data.status == undefined){
        res.send(data)
      }
      if(data.status == 404){
        //status code is sent as a string so using ==
        res.send('Vehicle ID was not found, please try another ID')
      }
      else{
        let info = data.data
        let fuelRes = {percent: info.tankLevel.value}
        res.send(fuelRes)
      }
    })
  
  })

  module.exports = app;