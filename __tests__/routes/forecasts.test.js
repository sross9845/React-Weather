import request from "supertest";
import server from "../../server/index";

describe("POST /api/forecasts", () => {
  it("returns status 200 if latitude and longitude are provided", async () => {
    await request(server)
      .post("/api/forecasts")
      .send({ latitude: 123, longitude: 123 })
      .expect(200);
  });

  it("returns status 400 and an error message if latitude and longitude are not provided", async () => {
    const res = await request(server)
      .post("/api/forecasts")
      .expect(400);

    expect(res.text).toEqual('"Latitude and longitude are required"');
  });
});
