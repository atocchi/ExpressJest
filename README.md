# Smart Test
For this API I used a template for JEST / supertest testing with Express,
there is a another branch of this repository -lessverbose, which has less verbose logging and comments, check it out


## Setup
1) Create a secret.js file, should look something like below
```
const secret = {
    GMAPI: 'http://<REALGMAPIHERE>/'
}

module.exports= secret;
```
2) Place it the root directory alongside server.js & app.js
3) Install node_modules with npm
 ```
   $ npm i
   ```
4) Run one of the server-side commands below
---------------------------------

## Server-Side Commands



```
$ npm test
```

This runs the JEST testing Suite, there are 3 simple tests and 5 unit tests.

All test can be ran with individually with ```$npm test $NAME``` where ```$NAME``` is whatever comes before ```.test```

**FYI tests will fail due to latency issues, with failures it's a good idea to run them twice in case of server latency**

Currently runs 3 simples tests: ```get.test``` , ```post.test```, and ```gm.test```

    * get.test checks for a 200 status code for all GET routes
    * post.test checks for a 200 status code for all POST routes
    * gm.test checks a dummy ID against the GM API, expects a response

Currently runs 5 unit tests, ```battery.test``` , ```fuel.test``` , ```engine.test``` , ```info.test``` , and ```doors.test```

These tests all check to make sure that respective routes return the correct JSON data, you can see the expected data in the next section below.
    
----------------------------------------

```
$ npm start
```

This runs the Express server, currently at port 3000

while the express server is running there are 5 routes: ```info``` , ```fuel``` , ```battery``` , ```doors```, and ```engine```

all these requests take an id in the form of a numerical string in their respective url, for example HOST:PORT/vehicles/```:id``` with the string replacing ```:id```

All API urls are accessed from HOST:PORT```/vehicles/```/```:id```

-----------

# Routes


## Info

    * info is a GET request that sends a JSON object (see below for sample)
      {"vin": "1234....", "color": "Beige", "doorCount": 2, "driveTrain": "v8"}
    info's actual route is HOST:PORT/vehicles/:id

## Fuel

    * fuel is a GET request that sends a JSON object (see below for sample)
      {"percent": "99.09"}
      Keep in mind if the vehicle is electric percent will be null
    fuel's actual route is HOST:PORT/vehicles/:id/fuel

## Battery

    * battery is a GET request that sends a JSON object (see below for sample)
      {"percent": "99.09"}
      Keep in mind if the vehicle is petrol percent will be null
    battery's actual route is HOST:PORT/vehicles/:id/battery

## Doors

    * doors is a GET request that sends a JSON object (see below for sample)
      {"frontLeft": "false", "frontRight": "false"}
      Keep in mind there can be 2 - 4 doors
    doors actual route is HOST:PORT/vehicles/:id/doors

## Engine

    * engine is a POST request that expects a JSON object (see below for sample)
      {"action": "START" || "STOP"}
      expected response looks something like this:
      {"status": "error"}
    engine's actual route is HOST:PORT/vehicles/:id/engine
---------------
## Logging

Currently all all routes log to the server console, each log is broke up by '########' and the end of each API call is signified by '***********', i've tried to make the logs as readable possible, the only exception is the GM security log as it outputs objects in an array in an object and ends up being a pain for the console to render

### notes:

* app and server are separated to allow for testing with super-test
* I went very heavy on the logging, I did this to try to show my flow and thought process, it can make the tests a pain to read and for that I apologize
* this repository has been dockerized @ dockerhub, use the folling command to pull ``` docker pull atocchi/smarttest:latest```
* docker file runs with ```docker run -it --rm -p 3000:3000 smarttest```
* this container is live on IBM kubernetes at endpoint ```http://169.57.43.142:30502/vehicles/``` currently it is only a single pod



