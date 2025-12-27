const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("responds with 200 and serves index.html", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("<html");
  });
});