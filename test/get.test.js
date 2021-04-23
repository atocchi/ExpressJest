const request = require("supertest");
const app = require("../app");


//these are all very basic test that are made to make sure the all get routes give 200's using a dummy id
//since they are pretty simple test i've made a function / template
function getTest(route){
  describe("Testing the get route for fuel", () => {
    test("Expecting 200 from GET route", done => {
      request(app)
        .get(`/vehicles/1111/${route}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
  });
  });
}
//actual tests being preformed
getTest('fuel')
getTest('battery')
getTest('doors')
getTest('')