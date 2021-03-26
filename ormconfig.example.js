module.exports = {
  "type":"type_of_database",
  "url": "database_url",
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
