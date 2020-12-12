"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAppointments1599087614734 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'appointments',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'provider',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'date',
        type: 'timestamp with time zone',
        isNullable: false
      }, {
        name: 'clocks_in',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'clocks_out_lunch',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'clocks_in_lunch',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'clocks_out',
        type: 'varchar',
        isNullable: true
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
    await queryRunner.dropTable('appointments');
  }

}

exports.default = CreateAppointments1599087614734;