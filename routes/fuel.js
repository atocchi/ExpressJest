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
        console.log(`404 from GM: Vehicle ID was ${id}`)
        console.log('################################')
        let error = {error: 'Vehicle ID was not found, please try another ID'}
        res.send(error)
      }
      else{
        try{
            let info = data.data.tankLevel.value
            //decided to remain with the null as its probably most helpful for users because even though its less readable to humans, to an endpoint it makes more sense
            let fuelRes = {percent: info}
            console.log('Reforming data from GM API: see below')
            console.log(fuelRes)
            console.log('if you recieve null here, it means the vehicle is electric')
            console.log('################################')
            console.log('End of API call')
            console.log('********************************')
            res.send(fuelRes)
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