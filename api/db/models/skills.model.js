const { Model, DataTypes, Sequelize } = require('sequelize');

const SKILL_TABLE = 'skill';

const SkillSchema = {
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
}

class Skill extends Model {
  static associate() {
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: SKILL_TABLE,
      modelName: 'Skill',
      timestamps: false
    }
  }
}

module.exports = { SKILL_TABLE, SkillSchema, Skill }
