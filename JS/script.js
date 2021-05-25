
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");
const Employee = require("./Employee");
const teamArr = []


function employeeQs() {

    inquirer.prompt([
        {
            type: "input",
            message: " Which team member you would like to add ? ",
            name: "answerName"
        },
        {
            type: "input",
            message: "Great. Please enter  ID number",
            name: "answerID"
        },
        {
            type: "input",
            message: "Great. Please enter e-mail adress?",
            name: "answerEmail"
        },
        {
            type: "list",
            message: "What is your role in the company?",
            name: "answerRole"
            Choices: ["Engineer", "Intern", "Manager"]
        },
    ]).then(function(answers) {
        if (answers.answerRole === "Engineer") {
            internQs(answers);
        } else if (answers.answerRole === "Intern") {
            internQs(answers);
        } else {
            managerQs(answers);
        }
    })
}

function engineerQs(baseAnswers) {
    inquirer.prompt ([
        {
            type: "input",
            message: " Please enter GitHub username ", 
            name: "answerGithub",
        },
        {
            type: "Confirm",
            message: "Okay, Would you like to add another?",
            name: "answerAddAnother",
        },
    ]).then(function (answers) {
        const newEngineer = new Engineer(baseAnswers.answerName, baseAnswers.answerID, baseAnswers.answerEmail, baseAnswers.answerGithub)
        teamArr.push(newEngineer);
        if (answers.answerAddAnother === true) {
            employeeQs()
        } else {
            buildTeam();
            console.log("rendered!")
        }
    })
}


function internQs(baseAnswers) {
    inquirer.prompt ([
        {
            type: "input",
            message: "Where did they go to school?",
            name: "answerGithub",
        },
        {
            type: "Confirm",
            message: "Would you like to add another?",
            name: "answerAddAnother",
        },
    ]).then(function (answers) {
        const newIntern = new intern(baseAnswers.answerName, baseAnswers.answerID, baseAnswers.answerEmail, baseAnswers.answerGithub)
        teamArr.push(newIntern);
        if (answers.answerAddAnother === true) {
            employeeQs()
        } else {
            buildTeam();
            console.log("rendered!")
        }
    })
}

// const { fstat } = require("fs");

function managerQs(baseAnswers) {
    inquirer.prompt ([
        {
            type: "input",
            message: "Please enter their office number".
            name: "answerOfficeNumber",
        },
        {
            type: "confirm",
            message: "sWould you liketo add another?",
            name: "answerAddAnother",
        },
    
    ]).then(function (answers) {
        const newManager = new Manager(baseAnswers.answerName, baseAnswers.answerID, baseAnswers.answerEmail, baseAnswers.answerGithub)
            teamArr.push(newManager);
        if (answers.answerAddAnother === true) {
            employeeQs()
        } else {
            buildTeam();
            console.log("rendered!")
        }
    })

}


function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamArr), "utf-8");
}

employeeQs();