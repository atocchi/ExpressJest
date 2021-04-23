const axios = require('axios')
//Using Axios for readability, could use fetch instead to decrease node_modules folder
const secret = require('./secret.js')
//don't want to make API public, normally would be .ENV for deployment
const GMAPI = secret.GMAPI
//I added a fake http like to send bad status codes just to test, you could add that too if you want
// const fake = secret.fake

//Created this function because we are always expecting JSON, and only ID is changing each call
//Takes 4 args (id, route, callback, command) 
//id takes a 4 digit string
//route takes one of 4 strings, (info,security,energy,startStop)
//callback is a callback, takes a function this might be easier with promises
//command is an optional arg, that only works with startStop, takes either START_VEHICLE or STOP_VEHICLE strings

function GMCall(id, route, callback, command) {
//included hash to make function more readable and allow for simpler args

let hash = {
    "info" : 'getVehicleInfoService',
    "security": 'getSecurityStatusService',
    "energy": 'getEnergyService',
    "startStop" : 'actionEngineService'
}
let API = hash[route]
//error handling to limit bad API calls, currently logs and returns so bad API call is not made, the returns exist so that code does not hit GM's API
if(hash[route] === undefined){
    console.log('Error: Incorrect route, please specify either, info, security, energy, or startStop')
    callback('Fail: Wrong Route')
    return
}
if(route === 'startStop'){
    if(command !== 'STOP_VEHICLE' && command !=='START_VEHICLE'){
        console.log(command)
        console.log('Error: startStop requires a command arg, either START_VEHICLE or STOP_VEHICLE')
        callback('Fail: Wrong Command')
        return
        }
    }
let data = {"id" : id, "responseType": "JSON", "command": command}
//main Axios call, includes error handling if we do not get a 200 to proceed 
console.log(`Sending data to ${API}: see below for data`)
console.log(data)
console.log('################################')
axios.post(`${GMAPI}/${API}`, data).then(function (res){
    if(res.status === 200){
        console.log('Data recieved: see below')
        console.log(res.data)
        console.log('################################')
        //this will still 200 even if GM sends back 404 for vehicle not found, 
        callback(res.data)
    }
    else{
        callback({error : `${res.status}: GM API could not be reached, Please try again`})
        console.log('################################')
    }
},function(err){
    //This first reponse pretty much only shows up if the server has no internet or can't even get a 404
    if(err.response == undefined){
        callback(err.code  + ': Please check your connection status')
    }
    //this error is uncommon but helps stop the server from hanging if GM is giving at actual 404 due to traffic or moving
    else{
        callback(err.response.status + ': Could not communicate with GM API')
    }
} )
}

module.exports =(GMCall)