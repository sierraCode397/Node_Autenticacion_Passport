'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { PORTAFOLIO_TABLE } = require('../models/portafolio.model');
const { SKILL_TABLE } = require('../models/skills.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PORTAFOLIO_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      code: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      link: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable(SKILL_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      experience: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface) {

    await queryInterface.dropTable(PORTAFOLIO_TABLE);
    await queryInterface.dropTable(SKILL_TABLE);
  }
};
