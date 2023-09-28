'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', CustomerSchema.userId);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id', CustomerSchema.userId);
  }
};
