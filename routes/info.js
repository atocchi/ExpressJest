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
      else if(data.status == 404){
        //status code is sent as a string so using ==
        console.log(`404 from GM: Vehicle ID was ${id}`)
        console.log('################################')
        let error = {error: 'Vehicle ID was not found, please try another ID'}
        res.send(error)
      }
      else{
        try{
          let info = data.data
          let door = info.fourDoorSedan.value == true ? 4 : 2
          let infoRes = {vin: info.vin.value, color: info.color.value, doorCount: door, driveTrain: info.driveTrain.value}
          console.log('Reforming data from GM API: see below')
          console.log(infoRes)
          console.log('################################')
          console.log('End of API call')
          console.log('********************************')
          res.send(infoRes)
        }
        catch(err){
          console.log('Data reformation failed, see below for error logs')
          console.log(err)
          console.log('################################')
          console.log('End of API call')
          console.log('********************************')
          resErr = {404: 'Looks like recieved data was malformed or incomplete'}
          res.send(resErr)
        }
      }
    })
  
  })

  module.exports = app;