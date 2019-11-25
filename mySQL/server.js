var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function menuMain () {
    inquirer
    .prompt([
        {
            name: "firstPrompt",
            message: "What would you like to do?",
            type: "rawlist",
            choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department"],
        }
    ])
    .then(answers => {
        console.log(answers);
    })
}
menuMain();