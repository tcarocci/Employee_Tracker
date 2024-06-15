-- Seeds department information
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');
-- Seeds role information
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 60000, 1), 
('Engineer', 80000, 2), 
('Accountant', 70000, 3);
-- Seeds employee information
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Sam', 'Sample', 1, NULL), 
('Timothy', 'Test', 2, 1), 
('Join', 'Johnson', 3, 1);
