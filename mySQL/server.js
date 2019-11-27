var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "",
  password: "",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  menuMain();
});

function menuMain () {
  inquirer
  .prompt(
      {
          name: "firstPrompt",
          message: "What would you like to do?",
          type: "list",
          choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department", "Update Employee", "Quit"],
      }
  )
  .then(function(answer) {
    switch (answer.firstPrompt) {
      case "View Employees":
        viewEmployees();
        break;

      case "View Departments":
        viewDepots();
        break;
      
      case "View Roles":
        viewRoles();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Department":
        addDepot();
        break;

      case "Update Employee":
        updateEmployee();
        break;
      
      case "Quit":
        quitMenu();
        break;
    }
  });
}

function viewDepots() {
  var query = "SELECT * FROM departments";
  connection.query(query, function(err, res) {
    if(err) throw err;
    for(var i = 0; i<res.length; i++) {
      const depoNames = res[i].name;
      const idNum = res[i].id;
      console.log(`${idNum} ${depoNames}`);
    }
    menuMain();
  })
}
function viewRoles() {
  var query = "SELECT * FROM roles";
  connection.query(query, function(err, res) {
    if(err) throw err;
    for(var i = 0; i<res.length; i++) {
      const rolesNames = res[i].title;
      const idNum = res[i].id;
      console.log(`${idNum} ${rolesNames}`);
    }
    menuMain();
  })
}
function viewEmployees() {
  var query = "SELECT * FROM employees";
  connection.query(query, function(err, res) {
    if(err) throw err;
    for(var i = 0; i<res.length; i++) {
      const firstName = res[i].first_name;
      const lastName = res[i].last_name;
      const idNum = res[i].id;
      console.log(`${idNum} ${firstName} ${lastName}`);
    }
    menuMain();
  })
}
function addDepot() {
  inquirer
  .prompt([
    {
      name: "addDepot",
      type: "input",
      message: "What is the New Department's name?",
    },
  ])
  .then(depotName=> {
    var query = connection.query(
      "INSERT INTO departments SET ?",
      [
        {
          name: depotName.addDepot
        }
      ],
      function(err, res) {
        if(err) throw err;
        console.log(res.affectedRows);
        console.info(`Department Added!`);
        // console.log(query.sql);
        menuMain();
      }
    );
  });
}

function addRole() {
  inquirer
  .prompt([
    {
      name: "addRoles",
      type: "input",
      message: "What is the New Role's name?",
    },
  ])
  .then(roleName=> {
    var query = connection.query(
      "INSERT INTO roles SET ?",
      [
        {
          name: roleName.addRoles,
        }
      ],
      function(err, res) {
        if(err) throw err;
        console.log(res.affectedRows);
        console.info(`Role Added!`);
        // console.log(query.sql);
        menuMain();
      }
    );
  });
}

function addEmployee() {
  inquirer
  .prompt([
    {
      name: "addEmployeesFirst",
      type: "input",
      message: "What is the New Employee's first name?",
    },
    {
      name: "addEmployeesLast",
      type: "input",
      message: "What is the New Employee's last name?",
    },
  ])
  .then(employeeName=> {
    var query = connection.query(
      "INSERT INTO employees SET ?",
      [
        {
          first_name: employeeName.addEmployeesFirst,
          last_name: employeeName.addEmployeesLast,
        }
      ],
      function(err, res) {
        if(err) throw err;
        console.log(res.affectedRows);
        console.info(`Employee Added!`);
        // console.log(query.sql);
        menuMain();
      }
    );
  });
}

function updateEmployee() {
  var query = connection.query("SELECT * FROM employees", function(err, results) {
    if(err) throw err;
    // console.log(results);
    inquirer
      .prompt([
          {
            name: "choice",
            type: "rawlist",
            message: "Select an Employee to update",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
              }
              return choiceArray;
            },
          },
        ])
        .then(employeeUpdate => {
          // var chosenEmployee;
          // for(var i = 0; i < results.length; i++) {
          //   if (results[i].first_name === employeeUpdate.choice) {
          //     chosenEmployee = results[i];
          //   }
          // }
          console.log(employeeUpdate.choice);
          // var empPicked = employeeUpdate.choice;
          // var empID = employeeUpdate.choice.id;
          // console.log(empID);
          // console.log(empPicked);
          switchNames();
        }
      );
  });
  function switchNames() {
    inquirer
      .prompt([
        {
          name: "updateInfo",
          type: "rawlist",
          message: "What do you want to Update?",
          choices: ["Update First Name", "Update Last Name"],
        }
      ])
      .then(answer => {
        switch (answer.updateInfo) {
          case "Update First Name":
            updateNameFirst();
            break;
  
          case "Update Last Name":
            updateNameLast();
            break;
        }
      })
  }
  function updateNameFirst() {
    inquirer
      .prompt([
        {
          name: "updateFirst",
          type: "input",
          message: "What is the Employee's new First Name?"
        }
      ])
      .then(newFirst => {
        var query = connection.query(
          "UPDATE employees SET ? WHERE id = ?",
          [
            {
              first_name: newFirst.updateFirst
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(`First Name Updated`);
            console.log(res.affectedRows);
            menuMain();
          }
        )
      });
  }
  
  function updateNameLast() {
    inquirer
      .prompt([
        {
          name: "updateLast",
          type: "input",
          message: "What is the Employee's new Last Name?"
        }
      ])
      .then(newLast => {
        var query = connection.query(
          "UPDATE employees SET ? WHERE id = ?",
          [
            {
              last_name: newLast.updateLast
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(`Last Name Updated`);
            console.log(res.affectedRows);
            menuMain();
          }
        )
      });
  }
}


function quitMenu() {
  connection.end();
}