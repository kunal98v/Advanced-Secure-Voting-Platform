const express = require("express");
const app = express();

const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/User");

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect("mongodb://127.0.0.1/voting-app-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});


describe("POST /user/signup", () => {
  it("should create a new user successfully", async () => {
    const res = await request(app).post("/user/signup").send({
      username: "testuser",
      password: "password123",
      role: "voter",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User Created !");
  });

  it("should not allow duplicate username", async () => {
    // Create first user
    await request(app).post("/user/signup").send({
      username: "testuser",
      password: "password123",
      role: "voter",
    });

    // Try creating again
    const res = await request(app).post("/user/signup").send({
      username: "testuser",
      password: "password123",
      role: "voter",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/user/signup").send({
      username: "testuser",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
