const { Model, DataTypes, Sequelize } = require('sequelize');

const PORTAFOLIO_TABLE = 'portafolio';

const PortafolioSchema = {
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
}

class Portafolio extends Model {
  static associate() {
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PORTAFOLIO_TABLE,
      modelName: 'Portafolio',
      timestamps: false
    }
  }
}

module.exports = { PORTAFOLIO_TABLE, PortafolioSchema, Portafolio }
