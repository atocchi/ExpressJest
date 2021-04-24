const request = require("supertest");
const app = require("../app");

//Live Test for Battery route using both dummy ids
function getInfo(id){
    describe("Testing the GET route for battery", () => {
      test("Expecting valid JSON from Battery", done => {
        request(app)
          .get(`/vehicles/${id}/battery`)
          .then(response => {
            let res = response.body;
            //There exists solutions like toBeOneOf but it's kinda overkill for this test
            try{
                expect(typeof res.percent).toBe("string");
              }
            catch{
                expect(res.percent).toBe(null);
              }
            done();
          });
    });
    });
  }
  //actual test
  getInfo('1234');
  getInfo('1235');