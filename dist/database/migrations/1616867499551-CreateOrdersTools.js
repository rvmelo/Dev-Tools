"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateOrdersTools1616867499551 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders_tools',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'tool_id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'order_id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'quantity',
        type: 'int'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'ToolsID',
        columnNames: ['tool_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tools',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }, {
        name: 'OrdersID',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('orders_tools');
  }

}

exports.default = CreateOrdersTools1616867499551;