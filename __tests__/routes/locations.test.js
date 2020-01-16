import request from "supertest";
import server from "../../server/index";
import axios from "axios";

describe("POST /api/locations/name", () => {
  beforeAll(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { results: { name: "San Francisco" } } })
    );

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  it("returns status 200 if city name is provided", async () => {
    await request(server)
      .post("/api/locations/name")
      .send({ city: "San Francisco" })
      .expect(200);
  });

  it("returns status 400 and error message if city name is not provided", async () => {
    const res = await request(server)
      .post("/api/locations/name")
      .expect(400);

    expect(res.text).toEqual('"Input can\'t be blank"');
  });
});

describe("POST /api/locations/coords", () => {
  it("returns status 200 if latitude and longitude are provided", async () => {
    await request(server)
      .post("/api/locations/coords")
      .send({ latitude: 123, longitude: 123 })
      .expect(200);
  });

  it("returns status 400 if data provided is null or not a number ", async () => {
    const res = await request(server)
      .post("/api/locations/coords")
      .send({ latitude: "lat", longitude: null })
      .expect(400);

    expect(res.text).toEqual('"Latitude and Longitude are required"');
  });
});
