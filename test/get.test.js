const request = require("supertest");
const app = require("../app");


//these are all very basic test that are made to make sure the all get routes give 200's using a dummy id
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
// describe("Test the get route for battery", () => {
//     test("Expecting 200 from GET route", done => {
//       request(app)
//         .get("/vehicles/1111/battery")
//         .then(response => {
//           expect(response.statusCode).toBe(200);
//           done();
//         });
//     });
//   });

// describe("Test the get route for doors", () => {
//     test("Expecting 200 from GET route", done => {
//       request(app)
//         .get("/vehicles/1111/doors")
//         .then(response => {
//           expect(response.statusCode).toBe(200);
//           done();
//         });
//     });
//   });  

// describe("Test the get route for info", () => {
//     test("Expecting 200 from GET route", done => {
//       request(app)
//         .get("/vehicles/1111")
//         .then(response => {
//           expect(response.statusCode).toBe(200);
//           done();
//         });
//     });
//   });  
getTest('fuel')
getTest('battery')
getTest('doors')
getTest('')