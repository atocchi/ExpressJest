const request = require("supertest");
const app = require("../app");

//Live Test for doors route using both dummy ids
function getInfo(id){
    describe("Testing the GET route for doors", () => {
      test("Expecting valid JSON from doors", done => {
        request(app)
          .get(`/vehicles/${id}/doors`)
          .then(response => {
            let res = response.body;
            //Going to test both front doors because they are 100% there
            expect(typeof res.frontLeft).toBe("boolean");
            expect(typeof res.frontRight).toBe("boolean");
            //There exists solutions like toBeOneOf but it's kinda overkill for this test
            try{
                expect(Object.keys(res).length).toBe(2);
                }
            catch{
                expect(Object.keys(res).length).toBe(4);
            }
            done();
          });
    });
    });
  }
  //actual test
  getInfo('1234');
  getInfo('1235');