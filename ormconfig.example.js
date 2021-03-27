module.exports = {
  "type":"type_of_database",
  "url": process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL,
  "entities": [
    "./path/to/models/*.ts"
  ],

  "migrations": [
    "./path/to/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir":"./path/to/migrations"
  }
}
