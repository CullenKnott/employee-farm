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

function viewAllEmployees() {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      err ? console.log(err) : console.table(res), prompt();
    }
  );
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, res) {
    err ? console.log(err) : console.table(res), prompt();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, res) {
    err ? console.log(err) : console.table(res), prompt();
  });
}

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
      return db.promise().query("SELECT * FROM role");
    })
    .then((roleData) => {
      console.log(roleData);
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
      console.log(
        `Employee added: ${f_name} ${l_name}`
      );
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

// 2 more add functions
// update function

prompt();

// function addARole() {
//   db.query("SELECT * FROM department_list", function(err, results) {
//     if (err) {
//       console.log(err);
//       return workTime();
//     }
//     const departmentChoices = results.map(department => ({
//       value: department.id,
//       name: department.dept_name
//     }));
//     inquirer.prompt([
//       {
//         type: "input",
//         name: "addARole",
//         message: "Enter a Role Dood."
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "how much this joker making?"
//       },
//       {
//         type: "list",
//         name: "deptId",
//         message: "witch department does this belong to?",
//         choices: departmentChoices
//       }
// ]).then((inquirerResponse)=> {
//     console.log("Role added:  " + inquirerResponse.addARole)
//     let departmentId = inquirerResponse.deptId;
//     let roleName = inquirerResponse.addARole;
//     let roleSalary = inquirerResponse.salary;
//     db.query(`INSERT INTO
//              role_list
//              (title, salary, department_list_id)
//              VALUES
//              ('${roleName}',
//             '${roleSalary}',
//             '${departmentId}')`, function(err, results){
//       (err) ? console.log(err) : console.table(`Added:  ${roleName}!!!!`,results) , workTime()
//     })
//   })
// });
