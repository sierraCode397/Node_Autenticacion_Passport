'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { config } = require('./../../config/config');

const { UserSchema, USER_TABLE } = require('../models/user.model');
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');
const { CategorieSchema, CATEGORIE_TABLE } = require('../models/categories.model');
const { ORDER_TABLE } = require('../models/order.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model');
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('../models/order-products.model');

//Importante que en las migraciones tomes en cuenta el orden de creacion de las tablas
//Esto por que algunas van a estar relacionadas entre si y deben ser credas primero las ENTIDADES FUERTES
//Para que no te inpida crear las tablas por no existir su relacion

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORIE_TABLE, CategorieSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    const hash = await bcrypt.hash(config.authPassword, 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: config.authCorreo,
        password: hash,
        role: 'prime',
        created_at: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORIE_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};


