const parsewabz = require("../index");
const parser = new parsewabz({
  prefix: "!",
});

const readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function start() {
  var cmd;
  rl.question("parsewabz > ", function (name) {
    cmd = name;
    rl.close();
  });

  rl.on("close", function () {
    if (cmd === "quit") process.exit(0);
    // process input
    let prefix = parser.prefix;
    if (cmd.startsWith(prefix)) {
      var cmdName = parser.getCmdName(cmd);
      let cmdargs;
      switch (cmdName) {
        case "ban":
          cmdargs = parser.parseInput(cmd, {
            user: ["u"],
            reason: ["r"],
            days: ["d"],
            default: ["ddddd"],
          });
          console.log(cmdargs);
          console.log(
            `User getting banned: ${cmdargs.args.user}\nReason provided: ${
              cmdargs.args.reason || "No reason provided"
            }\nDays: ${cmdargs.args.days || "infinite"}`
          );
          break;
        case "eat":
          cmdargs = parser.parseInput(cmd, {
            user: ["u", "p"],
            food: ["f", "n"],
          });
          console.log(cmdargs);
          console.log(`${cmdargs.args.user} is eating ${cmdargs.args.food}`);
          break;
        default:
          console.log(`Command "${cmdName}" does not exist.`);
          break;
      }
    }
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    start();
  });
}
console.log(
  `Welcome to the parsewabz test. Write quit to quit. Also, the prefix is "${parser.prefix}"`
);
start();
