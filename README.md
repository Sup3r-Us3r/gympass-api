## App

GymPass API in Node.js + TypeScript that applies SOLID concepts and has unit and E2E tests.

## Functional Requirements

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to get the profile of a logged in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged in user;
- [x] It must be possible for the user to obtain their check-in history.
- [x] It should be possible for the user to search for nearby gyms up to 10km away;
- [x] It should be possible for the user to search for gyms by name;
- [x] User must be able to check into a gym.
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

## Business Rules

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] User cannot check-in if they are not near (100m) the gym;
- [x] Check-in can only be validated up to 20 minutes after creation;
- [x] The check-in can only be validated by administrators;
- [x] The academy can only be registered by administrators;

## Non-functional Requirements

- [x] User password must be encrypted;
- [x] The application data must be persisted in a PostgresSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] The user must be identified by a JWT (Json Web Token);

## Setup

Run the PostgreSQL container:

```sh
$ docker-compose up -d
```

Create an `.env` file:

```sh
$ cp .env.example .env
```

Edit this file and set the values for the requested environment variables, example:

```ts
# Node
NODE_ENV="development"

#Auth
JWT_SECRET="your-secret"

# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/solidapi?schema=public"
```

## Run app

```sh
$ npm run dev
```

## Build app

```sh
$ npm run build
```

## Run tests

Run unit tests

```sh
$ npm run test
```

Run E2E tests

```sh
$ npm run test:e2e
```

Generate coverage

```sh
$ npm run test:coverage
```
