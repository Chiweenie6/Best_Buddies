const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { userData, thoughtData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  // Remove existing Users
  await User.deleteMany({});
  // Remove existing Thoughts
  await Thought.deleteMany({});

  const users = [];
  const thoughts = [];

  // Add Users to the collection
  await User.collection.insertMany(userData);
  // Add Thoughts to the collection
  await Thought.collection.insertMany(thoughtData);

  console.table();
  console.info("🌱 Seeding Complete 🌱");
  process.exit(0);
});
