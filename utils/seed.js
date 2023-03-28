const connection = require("../config/connection");
const { User, Thought } = require("../models");
// const { db } = require("../models/User");
const { randomUsername, randomThoughts, randomUsers } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  // Remove existing Users
  await User.deleteMany({});
  // Remove existing Thoughts
  await Thought.deleteMany({});

  const users = [];
  const thoughts = randomThoughts(10);

  // Information being pushed/added to the users array
  for (let i = 0; i < randomUsers.length; i++) {
    const username = randomUsers[i];
    const email = `${username}@gmail.com`;

    users.push({
      username,
      email,
    });
  }

  // Add Users to the collection
  await User.collection.insertMany(users);
  // Add Thoughts to the collection
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("🌱 The Seeding is Complete 🌱");
  process.exit(0);
});
