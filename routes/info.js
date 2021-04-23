const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();

//This Route should always be last to avoid miss routing
app.get("/vehicles/:id", (req,res) =>{
    let id = req.params.id
    GMCall(id, 'info', function(data){
      if(data.status == undefined){
        res.send(data)
      }
      if(data.status == 404){
        //status code is sent as a string so using ==
        res.send('Vehicle ID was not found, please try another ID')
      }
      else{
        let info = data.data
        let door = info.fourDoorSedan.value == true ? 4 : 2
        let infoRes = {vin: info.vin.value, color: info.color.value, doorCount: door, driveTrain: info.driveTrain.value}
        res.send(infoRes)
      }
    })
  
  })

  module.exports = app;