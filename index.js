// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
require("console.table");

// create connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

// function that prompts the user
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
    // call function based on user response
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
          addEmployee();
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

// View all employees in database
function viewAllEmployees() {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      err ? console.log(err) : console.table(res), prompt();
    }
  );
}
// View all departments in database
function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, res) {
    err ? console.log(err) : console.table(res), prompt();
  });
}
// View all roles in database
function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, res) {
    err ? console.log(err) : console.table(res), prompt();
  });
}
// add a new department to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Enter a new department.",
      },
    ])
    .then((answer) => {
      let departmentName = answer.addDepartment;
      db.query(
        `INSERT INTO department (department_name) VALUES ('${departmentName}')`,
        function (err, res) {
          err ? console.log(err) : viewAllDepartments(), prompt();
        }
      );
    });
}
// add a new role; choose salary and department for new role
function addRole() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) {
      console.log(err);
      return prompt();
    }
    const departmentChoices = res.map((department) => ({
      value: department.id,
      name: department.department_name,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "Write the name of the new role you would like to add.",
        },
        {
          type: "input",
          name: "newSalary",
          message: "Input a salary for this new role (must be an interger).",
        },
        {
          type: "list",
          name: "dept",
          message: "Add the new role to a department",
          choices: departmentChoices,
        },
      ])
      .then((inquirerResponse) => {
        console.log("Role added: " + inquirerResponse.newRole);
        let deptId = inquirerResponse.dept;
        let roleName = inquirerResponse.newRole;
        let roleSalary = inquirerResponse.newSalary;
        db.query(
          `INSERT INTO role
      (title, salary, department_id)
      VALUES
      ('${roleName}',
      '${roleSalary}',
      '${deptId}')`,
          function (err, res) {
            err ? console.log(err) : viewAllRoles(), prompt();
          }
        );
      });
  });
}
// add employee to database; prompts for employee first_name, last_name, role title, and manager
function addEmployee() {
  let f_name, l_name, roleName, managerId;
  inquirer
    .prompt([
      {
        type: "Input",
        name: "firstName",
        message: "What is the new employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is their last name?",
      },
    ])
    .then((response) => {
      f_name = response.firstName;
      l_name = response.lastName;
      return db.promise().query("SELECT * FROM role"); // pull data from roles table
    })
    .then((roleData) => {
      const roleChoices = roleData[0].map((role) => ({
        value: role.id,
        name: role.title,
      }));
      return inquirer.prompt([
        {
          type: "list",
          name: "role",
          message: "Choose a role for the new employee.",
          choices: roleChoices,
        },
      ]);
    })
    .then((response) => {
      roleName = response.role;
      return db
        .promise()
        .query("SELECT * FROM employee WHERE manager_id IS NULL");
    })
    .then((mangData) => {
      const managerChoices = mangData[0].map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
      }));
      return inquirer.prompt([
        {
          type: "list",
          name: "manager",
          message: "Choose a manager for this employee",
          choices: managerChoices,
        },
      ]);
    })
    .then((response) => {
      managerId = response.manager;
      console.log(`Employee added: ${f_name} ${l_name}`);
      db.query(
        `INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
        VALUES
        ('${f_name}',
        '${l_name}',
        '${roleName}',
        '${managerId}')`,
        function (err, res) {
          err ? console.log(err) : viewAllEmployees(), prompt();
        }
      );
    });
}
// update an existing employee; prompts for employee to change, and what new role to give.
function updateEmployee() {
  let empName, newRole;
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) {
      console.log(err);
      return prompt();
    }
    const empChoices = res.map((employee) => ({
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Choose an employee you would like to update.",
          choices: empChoices,
        },
      ])
      .then((empResponse) => {
        empName = empResponse.employee;
        return db.promise().query("SELECT * FROM role");
      })
      .then((updateRole) => {
        const roleChoices = updateRole[0].map((role) => ({
          value: role.id,
          name: role.title,
        }));
        return inquirer.prompt([
          {
            type: "list",
            name: "roleChange",
            message: "Choose a new role for the selected employee.",
            choices: roleChoices,
          },
        ]);
      })
      .then((response) => {
        newRole = response.roleChange;
        console.log(`${empName}'s role has been changed to ${newRole}!`);
        db.query(
          `UPDATE employee SET role_id = ${newRole} WHERE id = ${empName}`,
          function (err, res) {
            err ? console.log(err) : viewAllEmployees(), prompt();
          }
        );
      });
  });
}
// quits out of the CLI app via exiting Node.js
function quit() {
  console.log("Goodbye");
  return process.exit(1);
}

prompt();
