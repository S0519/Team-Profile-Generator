// Package from the library needed for this application
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");



//Array of questions for user input
function employeeQs() {

    inquirer.prompt([
        {
            type: "input",
            message: " Which team member you would like to add ? ",
            name: "answerName"
        },
        {
            type: "input",
            message: "Please enter  ID number",
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
            name: "answerRole",
            choices: ["Engineer", "Intern", "Manager"]
        },

        //Questions and answers according to the role
    ]).then(function(answers) {
        if (answers.answerRole === "Engineer") {
            engineerQs(answers);
        } else if (answers.answerRole === "Intern") {
            internQs(answers);
        } else {
            managerQs(answers);
        }
    })
}


// enginner's questions Array
function engineerQs(baseAnswers) {
    inquirer.prompt ([
        {
            type: "input",
            message: " Please enter GitHub username ", 
            name: "answerGithub",
        },
        {
            type: "input",
            message: "Would you like to add another?",
            name: "answerAddAnother",
        },
        //Function for the extraquestion
    ]).then(function (answers) {
    const newEngineer = new Engineer(baseAnswers.answerName, baseAnswers.answerID, baseAnswers.answerEmail, answers.answerGithub)
        
      
        if (answers.answerAddAnother === "yes") {
            addHtml(newEngineer)
            employeeQs()
        } else {
            addHtml(newEngineer)
            finishHtml();
            console.log("rendered!")
        }
    })
}



//intern's questions Array
function internQs(baseAnswers) {
    inquirer.prompt ([
        {
            type: "input",
            message: "Where did they go to school?",
            name: "answerSchool",
        },
        {
            type: "input",
            message: "Would you like to add another?",
            name: "answerAddAnother",
        },
        //Function for the extraquestion
    ]).then(function (answers) {
    const newIntern = new intern(baseAnswers.answerName, baseAnswers.answerID, baseAnswers.answerEmail, answers.answerSchool)
    
     
        if (answers.answerAddAnother === "yes") {
            addHtml(newIntern)
            employeeQs()
        } else {
            addHtml(newIntern)
            finishHtml();
            console.log("rendered!")
        }
    })
}



//manager's questions Array
function managerQs(baseAnswers) {
    inquirer.prompt ([
        {
            type: "input",
            message: "Please enter their office number",
            name: "answerOfficeNumber",
        },
        {
            type: "input",
            message: "Would you like to add another?",
            name: "answerAddAnother",
        },
     //Function for the extraquestion
    ]).then(function (answers) {
        const newManager = new Manager(baseAnswers.answerName, baseAnswers.answerID, baseAnswers.answerEmail, answers.answerOfficeNumber)

            
        if (answers.answerAddAnother === "yes") {
            addHtml(newManager);
            employeeQs()
        } else {
            addHtml(newManager);
            finishHtml();
            console.log("rendered!")
        }
    })

}



/* Call the function, in the first place to create the head, body and foot of the html
then call the Array questions for each employee */ 
createHtml();
employeeQs();



//Javascript is going to be working as an html
function createHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <title>Team Profile Generator</title>
    
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
          crossorigin="anonymous"/>
        <link rel="stylesheet" href="style.css">
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
        <script src="https://kit.fontawesome.com/c8e4d183c2.js" crossorigin="anonymous"></script>	
    </head> 
    
    <body>

    <header class="redheader">
        <h1>My Team</h1>
    </header>

    
    <div class="team">`;
  
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
}



//Getting employee data
function addHtml(memberData) {
    return new Promise(function(resolve, reject) {
        const name = memberData.getName();
        const role = memberData.getRole();
        const id = memberData.getId();
        const email = memberData.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = memberData.getGithub();
            data = `<div class="engineer">
            <header>
                <h2>${name} <i class="fas fa-glasses"></i> Engineer</h2>
            </header>
            <div id="id">ID: ${id}</div>
            <div id="email">Email: ${email}</div>
            <div id="github">GitHub: ${gitHub}</div>
        </div>`;
        } else if (role === "Intern") {
            const school = memberData.getSchool();
            data = `<div class="intern">
            <header>
                <h2>${name} <i class="fas fa-glasses"></i> Intern</h2>
            </header>
            <div id="id">ID: ${id}</div>
            <div id="email">Email: ${email}</div>
            <div id="school">School: ${school}</div>
        </div>`;
        } else {
            const officePhone = memberData.getOfficeNumber();
            data = `<div class="manager">
            <header>
                <h2>${name} <i class="fas fa-mug-hot"></i> Manager</h2>
            </header>
            <div id="id">ID: ${id}</div>
            <div id="email">Email: ${email}</div>
            <div id="officeNumber">Office Number: ${officePhone}</div>
        </div>`
        }

        // AppendFileSync make an order, the function write to the file has to finish before the rest to the code continue    
        fs.appendFileSync("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    }); 
}



function finishHtml() {
    const html = 
    `</div>


    <footer>
        <h5> ❤️ BLK ️</h5>
        <p>
            &copy; 2021 Team Profile Generator
        </p>
    </footer>

    
</body>
</html>`;


     // AppendFileSync make an order, the function write to the file has to finish before the rest to the code continue   
    fs.appendFileSync("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}