const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { randomUsername, randomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  // Remove existing Users
  await User.deleteMany({});
  // Remove existing Thoughts
  await Thought.deleteMany({});

  const users = randomUsername(6);
  const thoughts = randomThought(2);

  // Add Users to the collection
  await User.collection.insertMany(users);
  // Add Thoughts to the collection
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("🌱 The Seeding is Complete 🌱");
  process.exit(0);
});
