const Request = require("request");

describe("Server", () => {
    let server;
    beforeAll(() => {
        server = require("../server");
    });

    afterAll(() => {
        server.close();
    });

    describe("POST/", () => {
        let data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status ).toBe(200);
            //jasmine.log("======>", data.status);
            process.stdout.write("this will be send to the console");
        })
    })

})