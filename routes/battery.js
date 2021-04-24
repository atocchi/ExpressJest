const express = require("express");
const GMCall = require('../GMCall');
const app = express.Router();

app.get("/vehicles/:id/battery", (req,res) =>{
    let id = req.params.id;
    GMCall(id, 'energy', function(data){
      if(data.status == undefined){
        res.send(data);
      }
      else if(data.status == 404){
        //status code is sent as a string so using ==
        console.log(`404 from GM: Vehicle ID was ${id}`);
        let error = {error: 'Vehicle ID was not found, please try another ID'};
        res.send(error);
      }
      else{
        try{
          //this is solution to making sure you get an actual null and not "null"
          let info = (data.data.batteryLevel.value == 'null' ? null : data.data.batteryLevel.value);
          let fuelRes = {percent: info};
          console.log('Reforming data from GM API');
          res.send(fuelRes);
        }
        catch(err){
          console.log('Data reformation failed, see below for error logs');
          console.log(err);
          resErr = {404: 'Looks like recieved data was malformed or incomplete'};
          res.send(resErr);
      };
      };
    });
  
  });

  module.exports = app;