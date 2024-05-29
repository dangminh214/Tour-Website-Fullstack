const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
/* Connecting to the database before each test. */
beforeAll(async () => {
  mongoose.connect(DB, {
    useNewUrlParser: true
  })
});

describe("GET all tours: /tours", () => {
  it("should return all tours", async () => {
    const res = await request(app).get("/tours");
    expect(res.statusCode).toBe(200);
    expect(res.body.tours).toBeDefined();
    expect(res.body.tours.length).toBeGreaterThan(0);
    console.log("Number of tours: ", res.body.tours.length)
  });
});

describe("GET all destinations: /destination", () => {
  it("should return all destinations", async () => {
    const res = await request(app).get("/destination");
    expect(res.statusCode).toBe(200);
    expect(res.body.destinations).toBeDefined();
    expect(res.body.destinations.length).toBeGreaterThan(0);
    console.log("Number of destinations: ", res.body.destinations.length)
  });
})

describe("GET all destinations: /destination", () => {
  it("should return all destinations", async () => {
    const res = await request(app).get("/destination");
    expect(res.statusCode).toBe(200);
    expect(res.body.destinations).toBeDefined();
    expect(res.body.destinations.length).toBeGreaterThan(0);
    console.log("Number of destinations: ", res.body.destinations.length)
  });
})

describe("GET a destinations: /destination/Darmstadt", () => {
  it("should return a destinationdetail", async () => {
    const res = await request(app).get("/destination/Darmstadt");
    expect(res.statusCode).toBe(200);
    console.log(res.body)
    expect(res.body).toBeDefined();
    console.log("Destination detail: ", res.body)
  });
})

describe("GET a tour: /tours/Let's go Darmstadt", () => {
  it("should return detail of a tour", async () => {
    const res = await request(app).get("/tours/Let's go Darmstadt");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
    console.log("Tour detail: ", res.body)
  });
})

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
