const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

function prompt() {
  const logoText = logo({
    name: "Employee Farm",
  }).render();
  console.log(logoText);
  inquirer
    .prompt([
      {
        type: "list",
        name: "message",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Vew all departments",
          "View all roles",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee",
          "QUIT",
        ],
      },
    ])
    .then((choices) => {
      let inquirerChoices = choices.message;
      switch (inquirerChoices) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "Vew all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addemployee();
          break;
        case "Update employee":
          updateEmployee();
          break;
        case "QUIT":
          quit();
          break;
      }
    });
}
