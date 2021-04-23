const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();

app.get("/vehicles/:id/battery", (req,res) =>{
    let id = req.params.id
    GMCall(id, 'energy', function(data){
      if(data.status == undefined){
        res.send(data)
      }
      else if(data.status == 404){
        //status code is sent as a string so using ==
        console.log(`404 from GM: Vehicle ID was ${id}`)
        console.log('################################')
        let error = {error: 'Vehicle ID was not found, please try another ID'}
        res.send(error)
      }
      else{
        let info = data.data.batteryLevel.value
        //decided to remain with the null as its probably most helpful for users because even though its less readable to humans, to an endpoint it makes more sense
        let fuelRes = {percent: info}
        console.log('Reforming data from GM API: see below')
        console.log(fuelRes)
        console.log('if you recieve null here, it means the vehicle is NOT electric')
        console.log('################################')
        console.log('End of API call')
        console.log('********************************')
        res.send(fuelRes)
      }
    })
  
  })

  module.exports = app;