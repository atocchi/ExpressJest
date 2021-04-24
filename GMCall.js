const axios = require('axios')
const secret = require('./secret.js')
const GMAPI = secret.GMAPI

function GMCall(id, route, callback, command) {

let hash = {
    "info" : 'getVehicleInfoService',
    "security": 'getSecurityStatusService',
    "energy": 'getEnergyService',
    "startStop" : 'actionEngineService'
};
let API = hash[route];
//error handling to limit bad API calls, currently logs and returns so bad API call is not made, the returns exist so that code does not hit GM's API
if(hash[route] === undefined){
    console.log('Error: Incorrect route, please specify either, info, security, energy, or startStop');
    callback('Fail: Wrong Route');
    return;
};
if(route === 'startStop'){
    if(command !== 'STOP_VEHICLE' && command !=='START_VEHICLE'){
        console.log(command);
        console.log('Error: startStop requires a command arg, either START_VEHICLE or STOP_VEHICLE');
        callback('Fail: Wrong Command');
        return;
        };
    };
let data = {"id" : id, "responseType": "JSON", "command": command};
console.log(`Sending data to ${API}`);
axios.post(`${GMAPI}/${API}`, data).then(function (res){
    if(res.status === 200){
        console.log('Data recieved');
        callback(res.data);
    }
    else{
        callback({error : `${res.status}: GM API could not be reached, Please try again`});
    }
},function(err){
    if(err.response == undefined){
        callback(err.code  + ': Please check your connection status');
    }
    else{
        callback(err.response.status + ': Could not communicate with GM API');
    }
} );
};

module.exports =(GMCall);