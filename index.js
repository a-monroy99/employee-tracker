// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '12345678',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

async function queryRoles() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles", function(err, res) {
      if (err) return reject(err);
      resolve(results);
    })
  })
}

async function queryEmployees() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM employees", function(err, res) {
      if (err) return reject(err);
      resolve(results);
    })
  })
}

// inquirer prompts
function primaryPrompt() {
  inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'menu',
      message: 'Select an option:',
      choices: [
        "view all departments", 
        "view all roles", 
        "view all employees", 
        "add a department", 
        "add a role", 
        "add an employee",
        "update an employee role",
        "Exit"
      ],
      loop: false
    }
  ])
  .then((answers) => {
    switch (answers.menu) {
      case "view all departments":
        db.query("SELECT * FROM departments", function (err, res) {
          console.table(res)
        });
      break;
  
      case "view all roles":
        db.promise().query("SELECT * FROM roles")
      .then(([rows, fields]) => {
        console.table(rows)
      })
      break;
  
      case "view all employees":
        db.promise().query("SELECT * FROM employees")
        .then(([rows, fiels]) => {
          console.table(rows)
        })
      break;
  
      case "add a department":
        promptDepartmentInfo();
      break;

      case "add a role":
        promptRoleInfo();
      break;

      case "add an employee":
        promptEmployeeInfo();
      break;

      case "update an employee":
        promptUpdateEmployee();
      break;
    }
  })
};

  

  const promptDepartmentInfo = () => { 
    inquirer.prompt([
      {
        type: 'input',
        name: 'Department',
        message: 'Enter the department name:'
      }
    ])
    .then((answers) => {

      db.promise().query('INSERT INTO departments (department) VALUES (?)', answers.Department, (error, results) => {
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Department data inserted successfully');
        }}
      );
        db.promise().query("SELECT * FROM departments")
        .then(([rows, fields]) => {
          console.table(rows)
        })
    })
  };

  const promptRoleInfo = () => { 
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter role title:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter salary:'
      },
      {
        type: 'input',
        name: 'department',
        message: 'Enter Department ID'
      }
    ])
    .then((answers) => {

      db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answers.title}", "${answers.salary}", "${answers.department}")`)
       .catch((err) => {
        console.error(err);
       });
        db.promise().query("SELECT * FROM roles")
        .then(([rows, fields]) => {
          console.table(rows)
        })
    })
  };

  async function promptEmployeeInfo() {
    const roles = await queryRoles()
    const employees = await queryEmployees()
      inquirer.prompt([
        {
          type: 'input',
          name: 'first',
          message: 'First Name'
        },
        {
          type: 'input',
          name: 'last',
          message: 'Last Name'
        },
        {
          type: 'list',
          name: 'role',
          message: 'Which Role ID?',
          choices: res.map((role) => ({name: role.title, value: role.id}))
        },
        {
          type: 'input',
          name: 'manager',
          message: 'Enter the Employees Manager ID'
        }
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answers.first,
            last_name: answers.last,
            role_id: answers.role,
            manager_id: answers.manager
          },
          function (err) {
            if (err) throw err;
            primaryPrompt()
          }
        )
        })
    }
    
    // .then((answers) => {

    //   db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answers.first}", "${answers.last}", "${answers.role}", "${answers.manager}")`)
    //    .catch((err) => {
    //     console.error(err);
    //    });
    //     db.promise().query("SELECT * FROM employees")
    //     .then(([rows, fields]) => {
    //       console.table(rows)
    //     })
    // })
    // }

  async function promptUpdateEmployee() {
    const employees = await queryEmployees();

    inquirer.prompt([
      {
        name: "employeesToUpdate",
        message: "Which messsage did you want to update?",
        type: "list",
        choices: employees.map((employees) => ({name: employees.first_name + " " + employees.last_name, value: employees.id}))
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which Role ID?',
        choices: res.map((role) => ({name: role.title, value: role.id}))
      }
    ])
  };

primaryPrompt();