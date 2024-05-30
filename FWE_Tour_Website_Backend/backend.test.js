const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

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
  });
});

describe("GET all destinations: /destination", () => {
  it("should return all destinations", async () => {
    const res = await request(app).get("/destination");
    expect(res.statusCode).toBe(200);
    expect(res.body.destinations).toBeDefined();
    expect(res.body.destinations.length).toBeGreaterThan(0);
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
    testTour = res.body.tour
    testTourID = res.body.tour._id
    testTourName = res.body.tour.name 
  });
})

describe("PATCH /tours/:testTourName/addDestination to test add a new destination to a tour", () => {
  it("should add a destination to a tour", async () => {
    const newToAddDestination = {
      name: "Test new Destination to add",
      description: "This is a test destination",
      imageCover: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ]
    };

    const resNewDestinationToAdd = await request(app).post("/destination/newDestination").send(newToAddDestination);

    const toAddDestination = {
      destinations: [`${resNewDestinationToAdd.body.destination._id}`]
    };
    toAddDestinationID = resNewDestinationToAdd.body.destination._id
    toAddDestinationName = resNewDestinationToAdd.body.destination.name

    const res = await request(app).patch(`/tours/${testTourName}/addDestination`).send(toAddDestination);
    
    expect(res.statusCode).toBe(200);
  });
})

describe("GET all Tours through a destination '/findTourByDestination/:destination' ", () => {
  it("the test tour should be displayed through the test destination", async () => {
    const newToAddDestination = {
      name: "new Destination to test get tours",
      description: "This is a test destination",
      imageCover: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ]
    };

    const testNewDest = await request(app).post("/destination/newDestination").send(newToAddDestination);

    const newTestTour = {
      name: "new tour to test get tours",
      description: "This is a test tour",
      destinations:[`${testNewDest.body.destination._id}`]
    }
    const restTestTour = await request(app).post(`/tours/newTour`).send(newTestTour);
    const res = await request(app).get(`/tours/findTourByDestination/${toAddDestinationName}`)
    expect(res.statusCode).toBe(200)
    await request(app).delete(`/destination/deleteADestination/${testNewDest.body.destination._id}`) 
    await request(app).delete(`/tours/deleteATour/${restTestTour.body.tour._id}`) 
  })
})

describe("PATCH /tours/:testTourName/removeDestination/:toRemoveDestinationName to test remove a new destination to a tour", () => {
  it("should remove a destinatiom to a tour", async () => {
    const newSecondToAddDestination = {
      name: "Test new second Destination to add",
      description: "This is a test destination",
      imageCover: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ]
    };

    const resNewSecondDestinationToAdd = await request(app).post("/destination/newDestination").send(newSecondToAddDestination);
    const toAddSecondDestination = {
      destinations: [`${resNewSecondDestinationToAdd.body.destination._id}`]
    };
    
    const resAddSecondDestination = await request(app).patch(`/tours/${testTourName}/addDestination`).send(toAddSecondDestination)
    
    const toRemoveDestination = {
      destinations: [`${resNewSecondDestinationToAdd.body.destination._id}`]
    };

    const res = await request(app).patch(`/tours/${testTourName}/removeDestination/${toAddDestinationName}`).send(toRemoveDestination);
    expect(res.statusCode).toBe(200);

    await request(app).delete(`/destination/deleteADestination/${toAddDestinationID}`)
    await request(app).delete(`/destination/deleteADestination/${resNewSecondDestinationToAdd.body.destination._id}`);
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

describe("PATCH update a tour using name: /tours/updateTourByName/${testTourName}", () => {
  it("should return detail of a tour", async () => {
    const updateTour = {
      name: "test update tour"
    }
    const res = await request(app).patch(`/tours/updateTourByName/${testTourName}`);
    expect(res.statusCode).toBe(200);
  });
})

describe("DELETE /tours/deleteATour/:testTourID", () => {
  it("should delete the test destination", async () => {
    const res = await request(app).delete(`/tours/deleteATour/${testTourID}`);
    expect(res.statusCode).toBe(204);
  });
});

describe("DELETE /destination/:testDestinationID", () => {
  it("should delete the test destination", async () => {
    const res = await request(app).delete(`/destination/deleteADestination/${testDestinationID}`);
    expect(res.statusCode).toBe(204);
  });
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
