var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "doDger$13",
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
          choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department", "Quit"],
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
    {
      name: "depotID",
      type: "input",
      message: "What is the New Department ID?",
    }
  ])
  .then(depotName=> {
    var query = connection.query(
      "INSERT INTO departments SET ?",
      [
        {
          id: depotName.depotID,
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
    {
      name: "roleID",
      type: "input",
      message: "What is the New Role ID?",
    }
  ])
  .then(roleName=> {
    var query = connection.query(
      "INSERT INTO roles SET ?",
      [
        {
          id: roleName.roleID,
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
    {
      name: "employeeID",
      type: "input",
      message: "What is the New Department ID?",
    }
  ])
  .then(employeeName=> {
    var query = connection.query(
      "INSERT INTO employees SET ?",
      [
        {
          id: employeeName.employeeID,
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

function quitMenu() {
  connection.end();
}