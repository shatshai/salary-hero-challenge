-- Create database and tables
CREATE DATABASE IF NOT EXISTS salary_hero;
USE salary_hero;

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
  pay_date TINYINT UNSIGNED NOT NULL DEFAULT 1,
  UNIQUE KEY idx_username (username),
  UNIQUE KEY idx_email (email),
  KEY idx_company (company_id)
);

INSERT INTO company (name, address) VALUES ('company name1', '123 Silom Rd.');
INSERT INTO company (name, address) VALUES ('company name2', '456 Rama 9 Rd.');

-- map from salary types enum
SET @salary_type1 := 1; -- Daily rate
SET @salary_type2 := 2; -- Monthly rate
SET @salary_type3 := 3; -- Monthly rate

SET @company1 := (SELECT id FROM company WHERE name = 'company name1');
SET @company2 := (SELECT id FROM company WHERE name = 'company name2');
INSERT INTO employee (username, email, company_id, salary, salary_type_id, pay_date) VALUES ('user1', 'user1@example.com', @company1, 700, @salary_type1, DEFAULT);
INSERT INTO employee (username, email, company_id, salary, salary_type_id, pay_date) VALUES ('user2', 'user2@example.com', @company2, 30000, @salary_type2, DEFAULT);
INSERT INTO employee (username, email, company_id, salary, salary_type_id, pay_date) VALUES ('user3', 'user3@example.com', @company2, 30000, @salary_type3, 25);
