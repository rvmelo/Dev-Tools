# Dev Tools API

API for storing/searching software development tools.

API documentation can be found at <rootDir>/api/openapi/openapi.yaml

- Production server: https://dev-tools-rvmelo.herokuapp.com/

## Instructions

install dependencies:
- yarn

run api:
- yarn dev:server

run migrations:
- yarn typeorm migration:run

## Environment Variables

APP_SECRET: Secret to generate tokens
DATABASE_URL: Database url for storing data (ormconfig.js)
TEST_DATABASE_URL: Database for tests (ormconfig.js)
ENVIRONMENT: Environment where the app runs (development/production)
TEST_MODE: Set the value to "on" for running tests using test database (on/off)

