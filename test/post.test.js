const request = require("supertest");
const app = require("../app");

//this is a very simple test to make sure the POST route sends back a 200 status code, uses dummy id
//incase we for some reason get more POST routes, we have this function
function postTest(route){
  describe("Testing the post route for engine", () => {
    test("Expecting 200 from GET route", done => {
      request(app)
        .post(`/vehicles/1111/${route}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
};
//actual test running
postTest('engine')