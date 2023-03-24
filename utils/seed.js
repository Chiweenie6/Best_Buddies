const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { db } = require("../models/User");
const { randomUsername, randomThoughts } = require("./data");

connection.on("error", (err) => err);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("BestBuddiesDB");
  dbo.collection("users").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("🔥🔥🔥 Collection deleted 🔥🔥🔥");
    db.close();
  });
});

connection.once("open", async () => {
  // Remove existing Users
  await User.deleteMany({});
  // Remove existing Thoughts
  await Thought.deleteMany({});

  const users = [];
  const thoughts = randomThoughts(10);

  for (let i = 0; i < 11; i++) {
    const userName = randomUsername();
    const email = `${userName}@gmail.com`;
    const friends = randomUsername();

    users.push({
      userName,
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
