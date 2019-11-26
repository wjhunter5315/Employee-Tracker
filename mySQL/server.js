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

// function menuMain () {
//     inquirer
//     .prompt([
//         {
//             name: "firstPrompt",
//             message: "What would you like to do?",
//             type: "list",
//             choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department"],
//         }
//     ])
//     .then(answers => {
//         console.log("Answer: ", answers.firstPrompt);
//         if(answers.firstPrompt==="View Departments"){
//           connection.query("SELECT * FROM departments", function(err, res) {
//             // if(err) throw err;
//             for(var i = 0; i<res.length; i++) {
//               const depoNames = res[i].name;
//               console.info(`Departments: ${depoNames}`);
//               menuMain();
//             }
//           })
//         }

//         if(answers.firstPrompt==="View Roles"){
//           connection.query("SELECT * FROM roles", function(err, res) {
//             if(err) throw err;
//             for(var i = 0; i<res.length; i++) {
//               const roles = res[i].title;
//               console.info(`Roles: ${roles}`);
//               menuMain();
//             }
//           })
//         }

//         if(answers.firstPrompt==="View Employees"){
//           connection.query("SELECT * FROM employees", function(err, res) {
//             if (err) throw err;
//             for (var i=0; i<res.length; i++) {
//               const firstName = res[i].first_name;
//               const lastName = res[i].last_name;
//               console.log(`Employees: ${firstName} ${lastName}`);
//               menuMain();
//             }
//           })
//         }

//         if(answers.firstPrompt==="Add Department"){
//           inquirer
//           .prompt([
//             {
//               name: "addDepot",
//               type: "input",
//               message: "What is the New Department's name?",
//             }
//           ])
//           .then(depotName=> {
//             connection.query("INSERT INTO departments SET ?",
//               {
//                 name: depotName.addDepot
//               },
//               function(err) {
//                 if(err) throw err;
//                 console.info(`Department Added!`);
//                 menuMain();
//               }
//             );
//           });
          
//         }

//         if(answers.firstPrompt==="Add Role"){
//           inquirer
//           .prompt([
//             {
//               name: "addRole",
//               type: "input",
//               message: "What is the New Role?",
//             }
//           ])
//           .then(roleName=> {
//             const newRole = roleName.addRole;
//             console.log(newRole);
//             connection.query("INSERT INTO roles SET ?",
//             {
//               title: newRole,
//             },
//               function(err) {
//                 // if(err) throw err;
//                 console.info(`Role Added!`);
//                 menuMain();
//               }
//             );
//           });
          
//         }

//         if(answers.firstPrompt==="Add Employee"){
//           inquirer
//           .prompt([
//             {
//               name: "addEmployeeFirst",
//               type: "input",
//               message: "What is the New Employee's first name?",
//             },
//             {
//               name: "addEmployeeLast",
//               type: "input",
//               message: "What is the New Employee's last name?",
//             }
//           ])
//           .then(roleName=> {
//             connection.query("INSERT INTO employees SET ?",
//               {
//                 first_name: roleName.addEmployeeFirst
//               },
//               {
//                 last_name: roleName.addEmployeeLast
//               },
//               function(err) {
//                 if(err) throw err;
//                 console.info(`Role Added!`);
//                 menuMain();
//               }
//             );
//           });
          
//         }

//     });
// }

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
        console.log(query.sql);
        menuMain();
      }
    );
  });
}
function quitMenu() {
  connection.end();
}