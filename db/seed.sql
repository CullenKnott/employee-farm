USE employee_db;

INSERT INTO department (employee_name)
VALUES ('Human resources'), -- 1
       ('Engineering'), -- 2
       ('Finance'), -- 3
       ('Technology'), -- 4
       ('Marketing'); -- 5

INSERT INTO role (title, salary, department_id)
VALUES ('Recruiter', 75000, 1), -- 1!
       ('Human resources officer', 110000, 1), -- 2! 
       ('Accountant', 130000, 3), -- 3!
       ('Actuary', 175000, 3), -- 4!
       ('Lead Engineer', 150000, 2), -- 5!
       ('Administrative assistant', 60000, 1), -- 6!
       ('IT Technician', 78000, 4), -- 7! 
       ('Chief marketing officer', 120000, 5); -- 8!

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Emily', 'Kash', 1, NULL), 
       ('Jenna', 'Lane', 2, NULL), 
       ('Bradley', 'Walker', 7, NULL), 
       ('Daniel', 'Trudy', 8, NULL), 
       ('Laura', 'Martino', 5, NULL), 
       ('Colt', 'Noir', 3, NULL),
       ('Larry', 'Lobster', 6, NULL), 
       ('Sammy', 'Noir', 4, NULL); 