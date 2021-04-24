const request = require("supertest");
const app = require("../app");

//Live Test for engine route using both dummy ids
function getInfo(id,action){
    describe("Testing the POST route for Engine", () => {
      test("Expecting valid JSON from Engined", done => {
        let data = {"action": action};
        request(app)
          .post(`/vehicles/${id}/engine`)
          .send(data)
          .set('Accept', 'application/json')
          .then(response => {
            let res = response.body;
            //There exists solutions like toBeOneOf but it's kinda overkill for this test
            try{
                expect(res.status).toBe("error");
              }
            catch{
                expect(res.status).toBe("success");
              }
            done();
          });
    });
    });
  }
  //actual test
  getInfo('1234', "START");
  getInfo('1234', "STOP");
  getInfo('1235', "START");
  getInfo('1235', "STOP");