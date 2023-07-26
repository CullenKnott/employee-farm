DROP DATABASE IF EXISTS employee_db
CREATE DATABASE employee_db

USE employee_db

-- employee department table --
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
employee_name VARCHAR(40) NOT NULL
);

-- employee role table --
CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES (department)(id) -- connects the 'id' from the 'department' table --
);

-- employee table --
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
FOREIGN KEY (role_id)
REFERENCES (role)(id), -- connects employee role 'id' to 'role_id' --
manager_id INT,
FOREIGN KEY (manager_id)
REFERENCES (employee)(id) -- connects manager id to employee id --
);