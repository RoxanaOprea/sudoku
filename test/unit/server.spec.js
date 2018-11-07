const request = require("request");
const server = require("../../server");
const dotenv = require("dotenv");

const base_url = "http://localhost:3001";
const body = { email: "test@test.com", password: "test" };

describe("Server", () => {
  describe("POST/", () => {
    var serverInstance;

    beforeEach(done => {
      serverInstance = server.connectToDatabase(done);
    });

    afterEach(async done => {
      const instance = await serverInstance;
      instance.close(done);
    });

    it("returns status code 200 and email for register", done => {
      request.post(`${base_url}/register`, { json: true, body }, function(
        error,
        response
      ) {
        //console.log("=========>", response.statusCode);
        expect(response.statusCode).toEqual(200);
        expect(response.body.email).toEqual(body.email);
        done();
      });
    });

    it("returns status code 200 and email for login", done => {
      request.post(`${base_url}/login`, { json: true, body }, function(
        error,
        response
      ) {
        expect(response.statusCode).toEqual(200);
        expect(response.body.user.email).toEqual(body.email);
        done();
      });
    });

    // it("returns authenticated user", done => {
    //   request.get(`${base_url}/authrequired`, { json: true, body }, function(error,response) {
    //     //console.log("------>", response.isAuthenticated());
    //     expect(response.isAuthenticated()).toBe(true);
    //     done();
    //   });
    // });
  });
});
