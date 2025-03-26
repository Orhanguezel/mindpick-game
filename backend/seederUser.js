import { faker } from "@faker-js/faker";
import connect from "./utils/connect.js";
import mongoose from "mongoose";
import User from "./models/User.js";

async function seedData() {
  await connect();
  await User.deleteMany({});

  for (let i = 0; i < 10; i++) {
    const newUser = new User({
      username: faker.person.fullName(),
      password: 123456,
    });
    await newUser.save();
  }
  console.log("Created and Saved successfuly!");
  await mongoose.connection.close();
}

seedData();
