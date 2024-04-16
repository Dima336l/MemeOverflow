import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server.mjs";
let response;

const api = supertest(app);
describe("Test Users", () => {
  it("should return a 200 response on GET /M00888146/users", (done) => {
    api.get("/M00888146/users").end((err, response) => {
      // Check there are no errors
      expect(err).to.equal(null);

      // Assert that the response status code is 200
      expect(response.statusCode).to.equal(200);

      // Call done() to indicate that the test is complete
      done();
    });
  });
    it('should create a new user on POST /M00888146/register', async() => {
      const email = "Nircadmitrii69lol@icloud.com"
      const name = "morpheus";
      const password = "dumitru123";

      response = await api
          .post('/M00888146/Register')
          .set('Content-Type', 'application/json')
          .send({
              userEmail: email,
              userName: name,
              userPassword: password
          })
          .then(response => {
              return response;
      });
      expect(response.body.success).to.be.equal(true);
      expect(response.body.message).to.be.equal("User registered successfully.");
  });
  it("should log a user in on POST /M00888146/Login", async () => {
    const email = "Nircadmitrii@icloud.com";
    const password = "Dumitras123@";
    const password2 = "Dumitras123@lol";
    response = await api
      .post("/M00888146/Login")
      .set("Content-Type", "application/json")
      .send({
        userEmail: email,
        userPassword: password2,
      })
      .then((response) => {
        return response;
      });

    expect(response.body.success).to.be.equal(false);
    response = await api
      .post("/M00888146/Login")
      .set("Content-Type", "application/json")
      .send({
        userEmail: email,
        userPassword: password,
      })
      .then((response) => {
        return response;
      });
    expect(response.body.success).to.be.equal(true);
  });

  it("should check if a user is logged in on GET  /M00888146/checkLogin", (done) => {
    api.get("/M00888146/checkLogin").end((err, response) => {
      expect(err).to.equal(null);
      expect(response.statusCode).to.equal(200);
      expect(response.body.login).to.equal(false);
      done();
    });
  });
});
