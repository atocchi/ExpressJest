const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();


app.get("/vehicles/:id/doors", (req,res) =>{
    let id = req.params.id
    GMCall(id, 'security', function(data){
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
          //Create a hashmap so that we always have the right amount of doors, no matter the model
          let doorHash = {}
          info.doors.values.map((doors) =>{
            doorHash[doors.location.value] = doors.locked.value
          })
          console.log('Reforming data from GM API: see below')
          console.log(doorHash)
          console.log('################################')
          console.log('End of API call')
          console.log('********************************')
          res.send(doorHash)
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