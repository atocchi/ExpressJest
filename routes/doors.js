const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();


app.get("/vehicles/:id/doors", (req,res) =>{
    let id = req.params.id
    GMCall(id, 'security', function(data){
      if(data.status == undefined){
        res.send(data)
      }
      if(data.status == 404){
        //status code is sent as a string so using ==
        res.send('Vehicle ID was not found, please try another ID')
      }
      else{
        let info = data.data
        //Create a hashmap so that we always have the right amount of doors, no matter the model
        let doorHash = {}
        info.doors.values.map((doors) =>{
          doorHash[doors.location.value] = doors.locked.value
        })
        res.send(doorHash)
      }
    })
  
  })

module.exports = app;