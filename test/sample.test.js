const request = require("supertest");
const app = require("../app");

describe("Test the get route", () => {
  test("Expecting 200 from GET route", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World!')
        done();
      });
  });
});

describe("Test the post route", () => {
    test("Expecting 200 from POST route", done => {
      request(app)
        .post("/post")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });

