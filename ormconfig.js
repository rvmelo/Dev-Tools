module.exports = {
  "type":"postgres",
  "url": process.env.TEST_MODE === 'off' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL,
  "entities": [
    process.env.ENVIRONMENT === 'development' ? "./src/models/*.ts" : "./dist/models/*.js"
  ],
  "ssl": process.env.ENVIRONMENT !== 'development',
  "extra": process.env.ENVIRONMENT !== 'development' ? {
    "ssl": {
      "rejectUnauthorized": false
    }
  } : {},
  "migrations": [
    process.env.ENVIRONMENT === 'development' ? "./src/database/migrations/*.ts" : "./dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir":"./src/database/migrations"
  }
}

