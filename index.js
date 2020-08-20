class ParseWabz {
  constructor(config) {
    this.prefix = config.prefix;
    // string
    this.args = config.args;
    //js object, looks like this:
    /*
    {
      "age": ["a"],
      "years": ["y"],
      "stuff": []
    }
    */
  }
  getCmdName(command) {
    return command.split(" ")[0].slice(this.prefix.length);
  }

  scanArgsForArg(arg) {
    // return array with boolean and full name

    let obj = Object.entries(this.args);
    //console.log(obj);
    for (let i = 0; i < obj.length; i++) {
      if (obj[i][1].includes(arg)) {
        //console.log(obj[0][0]);
        return [true, obj[i][0]];
      }
    }
    return [false, undefined];
  }

  parseArgs(input) {
    // not meant to be called by the user
    var output = {};
    let curarg = undefined;
    let curargval = "";
    for (let i = 0; i < input.length; i++) {
      let curvar = input[i];
      // lmao spaghetti code
      if (curvar.startsWith("-")) {
        if (curvar.startsWith("--")) {
          if (this.args[curvar.slice(2)]) {
            curarg = curvar.slice(2);
            //output[curvar.slice(2)] = input[i + 1];
            //i++;
          }
        } else {
          let res = this.scanArgsForArg(curvar.slice(1));
          if (res[0]) {
            curarg = res[1];
            //output[res[1]] = input[i + 1];
            //i++;
          }
        }
      }
      if (curarg) {
        // console.log(curarg);
        try {
          if (!input[i + 1].startsWith("-")) {
            curargval += input[i + 1] + " ";
          } else {
            let itii = input[i + 1];
            //console.log("We have something that could be an arg: " + itii);
            if (
              (itii.startsWith("--") && this.args[itii.slice(2)]) ||
              this.scanArgsForArg(itii.slice(1))[0]
            ) {
              output[curarg] = curargval.trim();
              curarg = undefined;
              curargval = "";
            } else {
              curargval += itii + " ";
            }
          }
        } catch (ex) {
          //console.error(ex);
          output[curarg] = curargval.trim();
          curarg = undefined;
          curargval = "";
        }
      }
    }
    return output;
  }

  parseInput(input, args = this.args) {
    // you can set the argument here as well, if you want
    if (!this.args) this.args = args;
    var inputarr = input.split(" ");
    if (this.prefix) {
      inputarr[0] = inputarr[0].slice(this.prefix.length);
    }
    let retobj = {
      text: input,
      cmd: inputarr[0],
      args: this.parseArgs(inputarr),
    };
    return retobj;
  }
}

module.exports = ParseWabz;
