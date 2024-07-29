const rl = require("readline");
const fs = require("node:fs");
const path = require("path");

let interface = new rl.Interface({
  input: process.stdin,
  output: process.stdout,
});

let currentPhase = 0;
let answers = [];

let phaseQuestions = [
  "What is your Command's Name?\n",
  "What is your Command's Description?\n",
  "What is Your Command Type? (Slash, Text, Both)\n",
  "What is Your Command's Category?\n",
  "What Are Your Command's Aliases? (alias1, alias2)\n",
];

function splitAliases(aliasesString) {
  return aliasesString.split(",").map((alias) => alias.trim());
}

function createFileWithContent(commandData) {
  let commandOptions = {
    Name: commandData[0],
    Description: commandData[1],
    Type: commandData[2],
    Category: commandData[3],
    Aliases: splitAliases(commandData[4]),
  };

  let fileContent = `
  const CommandBuilder = require("../Structures/CommandBuilder.js")
  module.exports = {
    data: {
      new CommandBuilder()
      .setName("${commandOptions.Name}")
      .setDescription("${commandOptions.Description}")
      .setType("${commandOptions.Type.toUpperCase()}")
      .setCategory("${commandOptions.Category}")
      .setAliases(${JSON.stringify(commandOptions.Aliases)}),
      execute(message, args) {
        // Command logic here
      }
    }
  };
`;

  fs.writeFileSync(
    path.join(__dirname, "../src/Commands", `${commandOptions.Name}.js`),
    fileContent
  );
}

/**
 *
 * @param {Number} currentPhase
 * @param {String} answer
 * @returns {Boolean}
 */
function validateAnswers(currentPhase, answer) {
  if (currentPhase == 0) {
    if (answer.search(RegExp(`^[a-zA-Z]\\w+`)) === -1) {
      return false;
    }
  } else if (currentPhase == 1 || currentPhase == 3) {
    if (answer.match(RegExp(`^[a-zA-Z]\\w+`)) === null) {
      return false;
    }
  } else if (currentPhase == 2) {
    if (!["slash", "both", "text"].includes(answer.toLowerCase())) {
      return false;
    }
  }

  answers.push(answer);
  return true;
}

function askQuestionAndWaitForResponse(currentPhase) {
  if (currentPhase < phaseQuestions.length) {
    interface.question(phaseQuestions[currentPhase], (answer) => {
      let isAnswerValid = validateAnswers(currentPhase, answer);
      if (isAnswerValid) {
        askQuestionAndWaitForResponse(currentPhase + 1);
      } else {
        askQuestionAndWaitForResponse(currentPhase);
      }
    });
  } else {
    interface.question("Is This Data Correct? (Yes\\no) ", (answer) => {
      if (answer.toLowerCase().includes("n")) {
        currentPhase = 0;
        answers = [];
        askQuestionAndWaitForResponse(currentPhase);
      } else if (answer.toLowerCase().includes("y") || answer == "") {
        createFileWithContent(answers);
        interface.close();
      }
    });
  }
}

askQuestionAndWaitForResponse(currentPhase);
