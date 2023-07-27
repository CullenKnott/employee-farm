USE employee_db;

INSERT INTO department (department_name)
VALUES ('Human resources'), -- 1
       ('Engineering'), -- 2
       ('Finance'), -- 3
       ('Technology'), -- 4
       ('Marketing'); -- 5

INSERT INTO role (title, salary, department_id)
VALUES ('Recruiter', 75000, 1), -- 1!
       ('Human resources officer', 110000, 1), -- 2! mgnr
       ('Accountant', 130000, 3), -- 3!
       ('Actuary', 175000, 3), -- 4! mngr
       ('Lead Engineer', 150000, 2), -- 5! mngr
       ('Administrative assistant', 60000, 1), -- 6!
       ('IT Technician', 78000, 4), -- 7! 
       ('Chief marketing officer', 120000, 5); -- 8!mngr

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Emily', 'Kash', 2, NULL), -- 1 -- mngr
       ('Jenna', 'Lane', 4, NULL), -- 2 mngr
       ('Bradley', 'Walker', 5, NULL), -- 3 -- mngr
       ('Daniel', 'Trudy', 8, NULL), -- 4 mngr
       ('Laura', 'Martino', 1, 1), -- 5 --1
       ('Colt', 'Noir', 3, 2), -- 6 -- 2
       ('Larry', 'Lobster', 6, 4), -- 7 -- 4
       ('Sammy', 'Noir', 7, 3); -- 8 --3