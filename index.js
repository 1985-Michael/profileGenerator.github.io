const inquirer = require('inquirer');

const Employee = require("./class/Employee");
const Manager = require("./class/Manager");
const Engineer = require("./class/Engineer");
const Intern = require("./class/Intern");

const fs = require("fs");

const number = "";

formatted = number.replace(/(\d{1,2})(\d{1})?(\d{1,3})?(\d{1,4})?/,
    function(_, p1, p2, p3, p4) {

        let output = ""
        if (p1) output = `(${p1}`;
        if (p2) output += `${p2})`;
        if (p3) output += ` ${p3}`
        if (p4) output += ` ${p4}`
        return output;
    });

function createMembers() {
    const promptUser = [{
            question: "Name?",
            name: "name"
        },
        {
            question: "ID?",
            name: "id"
        },
        {
            question: "email?",
            name: "email"
        },
        {
            type: "list",
            question: "job title?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ],
            name: "job"
        }
    ];

    return inquirer
        .prompt(promptUser);
}


function promptManager() {
    const promptUser = [{
        question: "office number?",
        name: "number"
    }];

    return inquirer
        .prompt(promptUser);
}

function promptEngineer() {
    const promptUser = [{
        question: "github user name?",
        name: "github"
    }];

    return inquirer
        .prompt(promptUser);
}

function promptIntern() {
    const promptUser = [{
        question: "school?",
        name: "school"
    }];

    return inquirer
        .prompt(promptUser);
}


async function start() {
    let newMember = [];
    const count = 4;
    for (let i = 0; i < count; i++) {
        let promise = new Promise((resolve, reject) => {

            createMembers()
                .then(function({ name, id, email, job }) {

                    if (job === "Manager") {
                        promptManager().then(function({ number }) {
                            let employee = new Manager(name, id, email, number);
                            console.log(number);
                            newMember.push(employee);
                            resolve("complete");
                        });

                    } else if (job === "Engineer") {
                        promptEngineer().then(function({ github }) {
                            let employee = new Engineer(name, id, email, github);
                            console.log(github);
                            newMember.push(employee);
                            resolve("complete");
                        });
                    } else if (job === "Intern") {
                        promptIntern().then(function({ school }) {
                            let employee = new Intern(name, id, email, school);
                            console.log(school);
                            newMember.push(employee);
                            resolve("complete");
                        });
                    }

                }).catch(function(err) {
                    console.log("error.");
                    console.log(err);
                });
        });

        const result = await promise;
        console.log(result);
    }

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Document</title>
    <style>
       
</body>
</html>`

    for (let i in newMember) {
        let employee;
        employee = newMember[i];
        console.log(employee);
        let cardInfo

        cardInfo = {
            name: employee.getName(),
            role: employee.getRole(),
            id: employee.getId(),
            email: employee.getEmail()
        };

        if (employee.getRole() != "Engineer")
            if (employee.getRole() != "Manager")
                if (employee.getRole() == "Intern") {
                    cardInfo.school = employee.getSchool();
                } else {
                    cardInfo.github = employee.getGithub();
                }
        else {
            cardInfo.number = employee.getNumber();
        }

        html += getHtml(cardInfo);
    }
    fs.writeFile('index.html', html, function(err) {
        if (!err) {
            debugger;
        } else {
            throw err;
        }
        console.log('HTML file created successfully.');
    });
}

start()

function getHtml(_cardInfo) {
    let html = "<div>";
    return html;
}