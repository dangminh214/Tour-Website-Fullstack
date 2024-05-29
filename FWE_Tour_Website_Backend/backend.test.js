const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

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

describe("POST /destination/newDestination", () => {
  it("should create a new destination", async () => {
    const newDestination = {
      name: "Test Destination",
      description: "This is a test destination",
      imageCover: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ]
    };

    const res = await request(app).post("/destination/newDestination").send(newDestination);

    expect(res.statusCode).toBe(201);
    expect(res.body.destination).toBeDefined();
    expect(res.body.destination.name).toBe(newDestination.name);
    expect(res.body.destination.description).toBe(newDestination.description);
    expect(res.body.destination.imageCover).toEqual(expect.arrayContaining(newDestination.imageCover));
    testDestinationID = res.body.destination._id;
    testDestinationName = res.body.destination.name
  });
})

describe("POST /tours/newTour", () => {
  it("should create a new tour", async () => {
    const newTour = {
      name: "Test Tour",
      description: "This is a test tour",
      imageCover: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      destination: [`${testDestinationID}`]
    };

    const res = await request(app).post("/tours/newTour").send(newTour);

    expect(res.statusCode).toBe(201);
    expect(res.body.tour).toBeDefined();
    expect(res.body.tour.name).toBe(newTour.name);
    expect(res.body.tour.description).toBe(newTour.description);
    expect(res.body.tour.imageCover).toEqual(expect.arrayContaining(newTour.imageCover));
    testTourID = res.body.tour._id
    testTourName = res.body.tour.name 
  });
})

describe("GET a destinations: /destination/${testDestinationName}", () => {
  it("should return a destinationdetail", async () => {
    const res = await request(app).get(`/destination/${testDestinationName}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
})

describe("GET a tour: /tours/${testTourName}", () => {
  it("should return detail of a tour", async () => {
    const res = await request(app).get(`/tours/${testTourName}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });
})

describe("DELETE /tours/deleteATour/:testTourID", () => {
  it("should delete the test destination", async () => {
    const res = await request(app).delete(`/tours/deleteATour/${testTourID}`);
    expect(res.statusCode).toBe(204);
    console.log(`Delete a tour with ID = ${testTourID}`)
  });
});

describe("DELETE /destination/:testDestinationID", () => {
  it("should delete the test destination", async () => {
    const res = await request(app).delete(`/destination/deleteADestination/${testDestinationID}`);
    expect(res.statusCode).toBe(204);
    console.log(`Delete a destination with ID ${testDestinationID}`)
  });
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
