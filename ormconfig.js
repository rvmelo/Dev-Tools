module.exports = {
  "type":"postgres",
  "url": process.env.TEST_MODE === 'off' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL,
  "entities": [
    process.env.NODE_ENV === 'development' ? "./src/models/*.ts" : "./dist/models/*.js"
  ],
  "ssl": process.env.NODE_ENV !== 'development',
  "extra": process.env.NODE_ENV !== 'development' ? {
    "ssl": {
      "rejectUnauthorized": false
    }
  } : {},
  "migrations": [
    process.env.NODE_ENV === 'development' ? "./src/database/migrations/*.ts" : "./dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir":"./src/database/migrations"
  }
}

