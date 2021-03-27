"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTools1616704026448 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'tools',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'title',
        type: 'varchar'
      }, {
        name: 'link',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'tags',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('tools');
  }

}

exports.default = CreateTools1616704026448;