# Employee_Tracker

This application is a command-line interface (CLI) built to manage a company's employee database using Node.js, Inquirer, and PostgreSQL. It allows users to view and manage departments, roles, and employees, providing a streamlined way to organize and plan business operations.

## Video Link

[Clink Link to Video Demonstration]()

## Installation

1. Clone the repository:

- git@github.com:tcarocci/Employee_Tracker.git

2. Navigate to the project directory:

- cd Employee_Tracker

3. Install the necessary dependencies:

- npm install

4. Set up your PostgreSQL database:

- Create a database named company_db.
- Run the schema and seed files to create tables and populate initial data:

5. Configure the database connection:

- Update the config/connection.js file with your PostgreSQL credentials.

## Usage

1. Start the application:

- node index.js

2. Follow the prompts to view, add, update, or delete departments, roles, and employees.

<b>Main Menu Options</b>

1. View all departments
2. View all roles
3. View all employees
4. Add a department
5. Add a role
6. Add an employee
7. Update an employee role
8. Update employee managers
9. View employees by manager
10. View employees by department
11. Delete departments, roles, and employees
12. View the total utilized budget of a department
13. Exit

## Additional Information

- Ensure that PostgreSQL is running and accessible before starting the application.
- The application uses inquirer@8.2.4 to interact with the user via the command line.
- Database operations are handled using the pg package.
- The application structure follows the MVC paradigm with separate files for configuration, queries, and user prompts.

## Screenshots

Main Menu
![Main Menu](/assets/images/mmenu.png)

Departments
![Departments](/assets/images/departments.png)

Roles
![Roles](/assets/images/roles.png)

Employees
![Employees](/assets/images/employee.png)
