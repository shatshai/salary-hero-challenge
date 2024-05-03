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

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
