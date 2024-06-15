const fs = require('fs');
const path = require('path');
const client = require('../config/connection');

const readSQLFile = (fileName) => {
  return fs.readFileSync(path.join(__dirname, fileName)).toString();
};

const getAllDepartments = async () => {
  const query = readSQLFile('getAllDepartments.sql');
  const res = await client.query(query);
  return res.rows;
};

const getAllRoles = async () => {
  const query = readSQLFile('getAllRoles.sql');
  const res = await client.query(query);
  return res.rows;
};

const getAllEmployees = async () => {
  const query = readSQLFile('getAllEmployees.sql');
  const res = await client.query(query);
  return res.rows;
};

const getEmployeesByManager = async () => {
    const query = `
      SELECT 
        e1.first_name AS employee_first_name, 
        e1.last_name AS employee_last_name, 
        e2.first_name AS manager_first_name, 
        e2.last_name AS manager_last_name 
      FROM employee e1
      LEFT JOIN employee e2 ON e1.manager_id = e2.id
      ORDER BY e2.first_name, e2.last_name, e1.first_name, e1.last_name
    `;
    const res = await client.query(query);
    return res.rows;
  };

const getEmployeesByDepartment = async () => {
    const query = `
      SELECT 
        employee.first_name, 
        employee.last_name, 
        department.name AS department
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      ORDER BY department.name, employee.first_name, employee.last_name
    `;
    const res = await client.query(query);
    return res.rows;
  };

const addDepartment = async (name) => {
  const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
  const res = await client.query(query, [name]);
  return res.rows[0];
};

const addRole = async (title, salary, department_id) => {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
  const res = await client.query(query, [title, salary, department_id]);
  return res.rows[0];
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const res = await client.query(query, [first_name, last_name, role_id, manager_id]);
  return res.rows[0];
};

const updateEmployeeRole = async (employee_id, role_id) => {
  const query = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
  const res = await client.query(query, [role_id, employee_id]);
  return res.rows[0];
};
const updateEmployeeManager = async (employee_id, manager_id) => {
    const query = 'UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *';
    const res = await client.query(query, [manager_id, employee_id]);
    return res.rows[0];
  };

const deleteDepartment = async (id) => {
    const query = 'DELETE FROM department WHERE id = $1 RETURNING *';
    const res = await client.query(query, [id]);
    return res.rows[0];
  };
  
const deleteRole = async (id) => {
    const query = 'DELETE FROM role WHERE id = $1 RETURNING *';
    const res = await client.query(query, [id]);
    return res.rows[0];
  };
  
const deleteEmployee = async (id) => {
    const query = 'DELETE FROM employee WHERE id = $1 RETURNING *';
    const res = await client.query(query, [id]);
    return res.rows[0];
  };

const getDepartmentBudget = async (department_id) => {
    const query = `
      SELECT 
        department.name AS department,
        SUM(role.salary) AS total_budget
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE department.id = $1
      GROUP BY department.name
    `;
    const res = await client.query(query, [department_id]);
    return res.rows[0];
  };

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  getEmployeesByManager,
  getEmployeesByDepartment,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  getDepartmentBudget,
};
