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

  for (let i = 0; i < randomUsers.length; i++) {
    const username = randomUsers[i];
    const email = `${username}@gmail.com`;
    const friends = randomUsername();

    users.push({
      username,
      email,
      friends,
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
