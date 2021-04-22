const express = require("express");
const app = express();
const GMCall = require('./GMCall');
const fuel = require('./routes/fuel.js');
const battery = require('./routes/battery.js');
const doors = require('./routes/doors.js');
const engine = require('./routes/engine.js');
const info = require('./routes/info.js');



// //Cors even though it's only being used for the POST route
// const cors = require ('cors');
// app.use(cors());
// app.set('trust proxy', true);

// //Body Parser settings built into Express so we can see req.body
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(fuel)
app.use(battery)
app.use(doors)
app.use(engine)
app.use(info)

// app.get("/vehicles/:id/fuel", (req,res) =>{
//   let id = req.params.id
//   GMCall(id, 'energy', function(data){
//     //this is the error handler for uncommon errors, mainly if the computer isn't connected to the internet
//     if(data.status == undefined){
//       res.send(data)
//     }
//     if(data.status == 404){
//       //status code is sent as a string so using ==
//       res.send('Vehicle ID was not found, please try another ID')
//     }
//     else{
//       let info = data.data
//       let fuelRes = {percent: info.tankLevel.value}
//       res.send(fuelRes)
//     }
//   })

// })

// app.get("/vehicles/:id/doors", (req,res) =>{
//   let id = req.params.id
//   GMCall(id, 'security', function(data){
//     if(data.status == undefined){
//       res.send(data)
//     }
//     if(data.status == 404){
//       //status code is sent as a string so using ==
//       res.send('Vehicle ID was not found, please try another ID')
//     }
//     else{
//       let info = data.data
//       //Create a hashmap so that we always have the right amount of doors, no matter the model
//       let doorHash = {}
//       info.doors.values.map((doors) =>{
//         doorHash[doors.location.value] = doors.locked.value
//       })
//       res.send(doorHash)
//     }
//   })

// })

// app.get("/vehicles/:id/battery", (req,res) =>{
//   let id = req.params.id
//   GMCall(id, 'energy', function(data){
//     if(data.status == undefined){
//       res.send(data)
//     }
//     if(data.status == 404){
//       //status code is sent as a string so using ==
//       res.send('Vehicle ID was not found, please try another ID')
//     }
//     else{
//       let info = data.data
//       let fuelRes = {percent: info.batteryLevel.value}
//       res.send(fuelRes)
//     }
//   })

// })

// app.post("/vehicles/:id/engine", cors(), (req,res) =>{
//   let id = req.params.id
//   let request = req.body
//   let comHash = {
//     "START" : "START_VEHICLE",
//     "STOP"  : "STOP_VEHICLE"
//   }
//   if(comHash[request.action] == undefined){
//     res.send('Please send a correct command')
//   }
//   else{
//     GMCall(id, 'startStop', function(data){
//       if(data.status == undefined){
//         res.send(data)
//       }
//       if(data.status == 404){
//         //status code is sent as a string so using ==
//         res.send('Vehicle ID was not found, please try another ID')
//       }
//       else{
//         let stat = data.actionResult.status == "EXECUTED" ? "success" : "error"
//         let engineRes = {status: stat }
//         res.send(engineRes)
//       }
//     }, comHash[request.action])
//   }
// })


// //This Route should always be last to avoid miss routing
// app.get("/vehicles/:id", (req,res) =>{
//   let id = req.params.id
//   GMCall(id, 'info', function(data){
//     if(data.status == undefined){
//       res.send(data)
//     }
//     if(data.status == 404){
//       //status code is sent as a string so using ==
//       res.send('Vehicle ID was not found, please try another ID')
//     }
//     else{
//       let info = data.data
//       let door = info.fourDoorSedan.value == true ? 4 : 2
//       let infoRes = {vin: info.vin.value, color: info.color.value, doorCount: door, driveTrain: info.driveTrain.value}
//       res.send(infoRes)
//     }
//   })

// })

// app.get("/", (req, res) => {
//   res.status(200).send("Hello World!");
// });

// app.post("/post", (req, res) => {
//     res.status(200).send("Hello World!");
//   });
  

module.exports = app;