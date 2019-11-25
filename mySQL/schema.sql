DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL,
    name VARCHAR (30),
);

INSERT INTO department (id, name)
VALUES (1, "Sales");
INSERT INTO department (id, name)
VALUES (2, "Engineering");
INSERT INTO department (id, name)
VALUES (3, "Finance");
INSERT INTO department (id, name)
VALUES (4, "Legal");

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR (30),
    salary DECIMAL (10,2),
    department_id INT,
);

INSERT INTO roles (id, title, salary)
VALUES (1, "Sales Lead", 100000);
INSERT INTO roles (id, title, salary)
VALUES (2, "Salesperson", 80000);
INSERT INTO roles (id, title, salary)
VALUES (3, "Lead Engineer", 150000);
INSERT INTO roles (id, title, salary)
VALUES (4, "Software Engineer", 120000);
INSERT INTO roles (id, title, salary)
VALUES (5, "Accountant", 125000);
INSERT INTO roles (id, title, salary)
VALUES (6, "Legal Team Lead", 250000);
INSERT INTO roles (id, title, salary)
VALUES (7, "Lawyer", 190000);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR (30),
    last_night VARCHAR (30),
    role_id INT,
    manager_id INT,
);

INSERT INTO employees (id, first_name, last_name)
VALUES (1, "John", "DiMaggio");
INSERT INTO employees (id, first_name, last_name)
VALUES (2, "Mike", "Trout");
INSERT INTO employees (id, first_name, last_name)
VALUES (3, "Ashley", "Judd");
INSERT INTO employees (id, first_name, last_name)
VALUES (4, "Kevin", "Hart");
INSERT INTO employees (id, first_name, last_name)
VALUES (5, "Emily", "Blount");
INSERT INTO employees (id, first_name, last_name)
VALUES (6, "Sean", "Jordan");
INSERT INTO employees (id, first_name, last_name)
VALUES (7, "Ian", "Karmel");
INSERT INTO employees (id, first_name, last_name)
VALUES (8, "Tina", "Fey");