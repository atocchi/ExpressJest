const GMCall = require("../GMCall.js");

//as before, making all test functions so that we can keep things modular
function GMTest(route) {
  describe("Testing info to make sure dummy id does not exist", () => {
      test("Expecting Not found for vehicle", done => {
        GMCall('1111', route, function (res){
          expect(res.reason).toBe('Vehicle id: 1111 not found.');
          //this done() function is vital otherwise the test will timeout and fail
          done();
          //last arg is needed so that this test doesn't fail due to error handling
        },'START_VEHICLE');
      });
    });
}

//actual tests being run
GMTest('info');
GMTest('security');
GMTest('energy');
GMTest('startStop');
