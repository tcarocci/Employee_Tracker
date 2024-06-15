const inquirer = require('inquirer');
const db = require('./queries/queries');
require('console.table');

// const asciiArt = `
//           ,--------------------------------------------------.
//           |                                                  |
//           |   ____                 _                         |
//           |  | ___|_ _ ____  _ __ | | ___  _   _  ___  ___   |
//           |  |  _|| '_ \ _ \| '_ \| |/ _ \| | | |/ _ \/ _ \  |
//           |  | |__| | | | | | |_) | | (_) | |_| |  __/  __/  |
//           |  |____|_| |_| |_| .__/|_|\___/ \__, |\___|\___|  |
//           |                 |_|            |___/             |
//           |                                                  |
//           |   __  __                                         |
//           |  |  \/  | __ _ _ __   __ _  __ _  ___ _ __       |
//           |  | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '__|      |
//           |  | |  | | (_| | | | | (_| | (_| |  __/ |         |
//           |  |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|         |
//           |                            |___/                 |
//           |                                                  |
//           \--------------------------------------------------/`;
// Prompt for Main menu
const mainMenu = async () => {
    try {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Update employee manager',
            'View employees by manager',
            'View employees by department',
            'Delete department',
            'Delete role',
            'Delete employee',
            'View department budget',
            'Exit'
          ]
        }
      ]);

    console.log(`Selected action: ${action}`);
    //switch case for selection
    switch (action) {
      case 'View all departments':
        const departments = await db.getAllDepartments();
        console.table(departments);
        break;
      case 'View all roles':
        const roles = await db.getAllRoles();
        console.table(roles);
        break;
      case 'View all employees':
        const employees = await db.getAllEmployees();
        console.table(employees);
        break;
      case 'View employees by manager':
        await viewEmployeesByManager();
        break;
      case 'View employees by department':
        await viewEmployeesByDepartment();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Update employee manager':
        await updateEmployeeManager();
        break;
      case 'Delete department':
        await deleteDepartment();
        break;
      case 'Delete role':
        await deleteRole();
        break;
      case 'Delete employee':
        await deleteEmployee();
        break;
      case 'View department budget':
        await viewDepartmentBudget();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }
    // Loop back to main menu after completing action
    await mainMenu();

  } catch (error) {
    console.error("Error:", error);
  }
};

const addDepartment = async () => {
  console.log('Adding a department');
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]);
  await db.addDepartment(name);
  console.log(`Added department ${name}`);
};

const addRole = async () => {
  console.log('Adding a role');
  const departments = await db.getAllDepartments();
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
    }
  ]);
  await db.addRole(title, salary, department_id);
  console.log(`Added role ${title}`);
};

const addEmployee = async () => {
  console.log('Adding an employee');
  const roles = await db.getAllRoles();
  const employees = await db.getAllEmployees();
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for the employee:',
      choices: roles.map(role => ({ name: role.title, value: role.id }))
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager for the employee:',
      choices: [{ name: 'None', value: null }, ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))]
    }
  ]);
  await db.addEmployee(first_name, last_name, role_id, manager_id);
  console.log(`Added employee ${first_name} ${last_name}`);
};

const updateEmployeeRole = async () => {
  console.log('Updating an employee role');
  const employees = await db.getAllEmployees();
  const roles = await db.getAllRoles();
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee to update:',
      choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role for the employee:',
      choices: roles.map(role => ({ name: role.title, value: role.id }))
    }
  ]);
  await db.updateEmployeeRole(employee_id, role_id);
  console.log(`Updated employee role`);
};

const updateEmployeeManager = async () => {
    const employees = await db.getAllEmployees();
    const { employee_id, manager_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to update:',
        choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the new manager for the employee:',
        choices: [{ name: 'None', value: null }, ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))]
      }
    ]);
    await db.updateEmployeeManager(employee_id, manager_id);
    console.log(`Updated employee manager`);
  };

const viewEmployeesByManager = async () => {
    const employees = await db.getEmployeesByManager();
    console.table(employees);
  };
  
const viewEmployeesByDepartment = async () => {
    const employees = await db.getEmployeesByDepartment();
    console.table(employees);
  };

const deleteDepartment = async () => {
    const departments = await db.getAllDepartments();
    const { department_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department to delete:',
        choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
      }
    ]);
    await db.deleteDepartment(department_id);
    console.log(`Deleted department`);
  };
  
const deleteRole = async () => {
    const roles = await db.getAllRoles();
    const { role_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role to delete:',
        choices: roles.map(role => ({ name: role.title, value: role.id }))
      }
    ]);
    await db.deleteRole(role_id);
    console.log(`Deleted role`);
  };
  
const deleteEmployee = async () => {
    const employees = await db.getAllEmployees();
    const { employee_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to delete:',
        choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      }
    ]);
    await db.deleteEmployee(employee_id);
    console.log(`Deleted employee`);
  };

const viewDepartmentBudget = async () => {
    const departments = await db.getAllDepartments();
    const { department_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department to view its budget:',
        choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
      }
    ]);
    const budget = await db.getDepartmentBudget(department_id);
    console.table(budget);
  };
  
  
mainMenu();
