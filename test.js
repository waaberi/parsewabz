const parsewabz = require("./index");

var parser = new parsewabz({
  prefix: "$",
  args: {
    hours: ["h"],
    exp: ["e"],
  },
});

console.log(parser.parseInput("$work -h 10 -e lol"));
