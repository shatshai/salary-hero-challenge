-- Create database and tables
CREATE DATABASE IF NOT EXISTS salary_hero;
USE salary_hero;

-- Create table
DROP TABLE IF EXISTS salary_type;
CREATE TABLE IF NOT EXISTS salary_type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  description VARCHAR(50) NULL,
  UNIQUE KEY type (type)
);

DROP TABLE IF EXISTS company;
CREATE TABLE IF NOT EXISTS company (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(150) NULL,
  KEY idx_name (name)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE IF NOT EXISTS employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  company_id INT NOT NULL,
  salary DOUBLE(10, 2) UNSIGNED NOT NULL,
  salary_type_id TINYINT UNSIGNED NOT NULL,
  pay_date TINYINT UNSIGNED NULL,
  KEY idx_username (username),
  KEY idx_email (email),
  KEY idx_company (company_id)
);

-- Insert initial data
INSERT INTO salary_type (type, description) VALUES ('daily', 'Daily rate');
INSERT INTO salary_type (type, description) VALUES ('monthly', 'Monthly rate');
INSERT INTO salary_type (type, description) VALUES ('monthtodate', 'Monthly rate with payment date');

INSERT INTO company (name, address) VALUES ('company name1', '123 Silom Rd.');
INSERT INTO company (name, address) VALUES ('company name2', '456 Rama 9 Rd.');

SET @salary_type1 := (SELECT id FROM salary_type WHERE type = 'daily');
SET @salary_type2 := (SELECT id FROM salary_type WHERE type = 'monthly');
SET @salary_type3 := (SELECT id FROM salary_type WHERE type = 'monthtodate');

SET @company1 := (SELECT id FROM company WHERE name = 'company name1');
SET @company2 := (SELECT id FROM company WHERE name = 'company name2');
INSERT INTO employee (username, email, company_id, salary, salary_type_id, pay_date) VALUES ('user1', 'user1@example.com', @company1, 700, @salary_type1, null);
INSERT INTO employee (username, email, company_id, salary, salary_type_id, pay_date) VALUES ('user2', 'user2@example.com', @company2, 30000, @salary_type2, null);
INSERT INTO employee (username, email, company_id, salary, salary_type_id, pay_date) VALUES ('user3', 'user3@example.com', @company2, 30000, @salary_type3, 25);
