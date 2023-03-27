const usernames = [
  "burgerBob",
  "peteyGriff",
  "RogerTheAlien",
  "TheOneRing",
  "mountainDew",
  "DogsRule",
  "LuckyCharms",
  "CodingNerd",
  "PS5Gamer",
  "NeedCaffeine",
];

const thoughtTexts = [
  "Burgers are so delicious 🍔.",
  "I love salty french fries 🍟.",
  "Being a family guy is very important 👨‍👩‍👧‍👦.",
  "I believe there are aliens out there 👽.",
  "Destiny 2 is an amazing game! 🎮",
  "Frodo was very brave when he destroyed the one ring 💍.",
  "Lucky Charms cereal is the best late night snack 🍀.",
  "Looking at my computer screen for too long feels like im staring at the matrix 🖥️",
  "I prefer Monster energy drink to Red Bull 🧌",
  "My favorite dog is a chihuahua mix 🐶",
];

const reactions = [
  "YAAAAAAAAYYYYYYYYYYY!!!!!🎉",
  "I can't believe what I'm hearing 👂.",
  "I can game all day long 🕹️.",
  "I can eat anything and be happy 🍌🍇🍗🥙🍪🍕🥒.",
  "I prefer almond milk to cow milk 🥛.",
  "Ketchup is the best condiment 🍅.",
  "Tea is my preferred source of caffeine 🍵.",
  "Gandalf was such a good character 🧙‍♂️.",
  "UFOs exist!!! 🛸.",
  "Coding is fun! ⌨️ ",
];

// Function for non-repeating random usernames
function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
const randomUsers = shuffle(usernames);

const random = (rando) => rando[Math.floor(Math.random() * rando.length)];
const randomUsername = () => `${random(usernames)}`;

// Get random Thought with Reactions
const randomThoughts = (length) => {
  let thoughts = [];
  for (let i = 0; i < length; i++) {
    thoughts.push({
      thoughtText: random(thoughtTexts),
      username: randomUsername(),
      reactions: [...randomReactions(2)],
    });
  }
  return thoughts;
};

// Get Reactions to add to Thought
const randomReactions = (length) => {
  if (length === 1) {
    return random(reactions);
  }
  const reaction = [];
  for (let i = 0; i < length; i++) {
    reaction.push({
      reactionBody: random(reactions),
      username: randomUsername(),
    });
  }
  return reaction;
};

module.exports = { randomUsername, randomThoughts, randomUsers };
