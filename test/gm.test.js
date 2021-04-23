const GMCall = require("../GMCall.js");

describe("Testing info to make sure dummy id does not exist", () => {
    test("Expecting Not found for vehicle", done => {
      GMCall('1111', 'info', function (res){
        expect(res.reason).toBe('Vehicle id: 1111 not found.')
        //this done() function is vital otherwise the test will timeout and fail
        done()
      })
      
    });
  });

describe("Testing fuel to make sure dummy id does not exist", () => {
    test("Expecting 200 from GET route", done => {
      GMCall('1111', 'info', function (res){
        expect(res.reason).toBe('Vehicle id: 1111 not found.')
        //this done() function is vital otherwise the test will timeout and fail
        done()
      })
      
    });
  });
  