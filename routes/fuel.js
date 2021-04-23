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
      else if(data.status == 404){
        //status code is sent as a string so using ==
        let error = {error: 'Vehicle ID was not found, please try another ID'}
        res.send(error)
      }
      else{
        let info = data.data.tankLevel.value
        //decided to remain with the null as its probably most helpful for users because even though its less readable to humans, to an endpoint it makes more sense
        let fuelRes = {percent: info}
        res.send(fuelRes)
      }
    })
  
  })

  module.exports = app;