# Backend API using Nest Framework

This project is a backend API built with Nest framework in TypeScript. It utilizes MySQL as the database and Prisma as the ORM. Docker is used for deployment.

## Overview

The API calculates salary rates based on monthly and daily rates. It considers the number of days after the payment date or a specific daily date and the number of days for the daily salary rate.

## Technologies Used

* [Nest Framework](https://github.com/nestjs/nest)
* TypeScript
* MySQL
* [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)
* Docker

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

## Docker Test Environment

### Prerequisites
- Docker installed on your machine.

### Setting Up Docker Test Environment
1. Clone the repository:

```bash
git clone https://github.com/shatshai/salary-backend-api
cd salary-backend-api
```

2. Build and start the Docker containers
```bash
docker-compose up -d --build
```

## Testing the Backend API
* Once the Docker containers are running, you can test the backend API by sending HTTP requests to http://localhost:3000/sawgger using tools like cURL, Postman, or your browser.

## Stopping the Docker Containers
```bash
docker-compose down
```

## Endpoints

### Company

- `GET /company`: Retrieves a list of all companies.
- `POST /company`: Creates a new company.

- `GET /company/:id`: Retrieves details of a specific company.
- `PUT /company/:id`: Updates details of a specific company.
- `DELETE /company/:id`: Deletes a specific company.

### Employee

- `GET /employee`: Retrieves a list of all employees.
- `POST /employee`: Creates a new employee.

- `GET /employee/:id`: Retrieves details of a specific employee.
- `PUT /employee/:id`: Updates details of a specific employee.
- `DELETE /employee/:id`: Deletes a specific employee.

### Swagger Api Document
- `GET /swagger`: List the APIs document.

### Screen short
![Alt text](screenshot/swagger.png?raw=true "Swagger Backend APIs")

## Libraries

- **@nestjs/swagger**: A library that integrates Swagger (OpenAPI) with NestJS, allowing for automatic API documentation generation and interactive API exploration.
- **Helmet**: Middleware for securing NestJS applications by setting HTTP headers for enhanced security, including protection against common web vulnerabilities.
- **@prisma/client**: Prisma's official client for interacting with your database, providing a type-safe and auto-generated query builder for efficient database operations.
- **prisma**: Prisma's CLI tool for managing database migrations, generating Prisma client code, and performing various database-related tasks seamlessly.

## Database Schema

| Table Name    | Columns                         | Relationships                                 |
|---------------|---------------------------------|-----------------------------------------------|
| SalaryType    | id, type, description           | One-to-Many with Employee                     |
| Company       | id, name, address               | One-to-Many with Employee                     |
| Employee      | id, username, email, companyId,  | Many-to-One with Company                      |
|               | salary, salaryTypeId, payDate   | Many-to-One with SalaryType                   |

1. SalaryType Table:
  * Columns:
    * id: Integer, Primary Key, Autoincrement
    * type: String
    * description: String
  * Relationships:
    * One-to-Many with Employee table (employees field)
2. Company Table:
  * Columns:
    * id: Integer, Primary Key, Autoincrement
    * name: String
    * address: String
  * Relationships:
    * One-to-Many with Employee table (employees field)
3. Employee Table:
  * Columns:
    * id: Integer, Primary Key, Autoincrement
    * username: String
    * email: String
    * companyId: Integer, Foreign Key (company_id), References Company(id)
    * salary: Float
    * salaryTypeId: Integer, Foreign Key (salary_type_id), References SalaryType(id)
    * payDate: Integer, Default 1 (map to pay_date)
  * Relationships:
    * Many-to-One with Company table (company field)
    * Many-to-One with SalaryType table (salaryType field)

## Database Schema Description
* SalaryType Table:
  * Represents different types of salary structures.
  * Contains fields for id, type (e.g., hourly, monthly), and description.
* Company Table:
  * Stores information about companies.
  * Includes fields for id, name, and address.
* Employee Table:
  * Holds details about employees.
  * Includes fields for id, username, email, salary, payDate (defaulted to 1), and foreign keys for companyId and salaryTypeId.
  * Establishes relationships with Company (many employees belong to one company) and SalaryType (each employee has a salary type).

## License

Nest is [MIT licensed](LICENSE).
