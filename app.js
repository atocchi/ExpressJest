const express = require("express");
const app = express();

//sources for route files
const fuel = require('./routes/fuel.js');
const battery = require('./routes/battery.js');
const doors = require('./routes/doors.js');
const engine = require('./routes/engine.js');
const info = require('./routes/info.js');


//using route to modularize code, this way we aren't dealing with one huge page of code
app.use(fuel)
app.use(battery)
app.use(doors)
app.use(engine)
app.use(info)


module.exports = app;