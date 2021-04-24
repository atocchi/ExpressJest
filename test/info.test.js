const request = require("supertest");
const app = require("../app");

//Live Test for Info route using both dummy ids
function getInfo(id){
    describe("Testing the GET route for info", () => {
      test("Expecting valid JSON from Info", done => {
        request(app)
          .get(`/vehicles/${id}/`)
          .then(response => {
            let res = response.body;
            expect(typeof res.color).toBe("string");
            expect(typeof res.doorCount).toBe("number");
            expect(typeof res.vin).toBe("string");
            expect(typeof res.driveTrain).toBe("string");
            done();
          });
    });
    });
  }
  //actual test
  getInfo('1234');
  getInfo('1235');
