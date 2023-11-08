const { Model, DataTypes, Sequelize } = require('sequelize');

const CERTIFICATE_TABLE = 'certificate';

const CertificateSchema = {
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

class Certificate extends Model {
  static associate() {
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CERTIFICATE_TABLE,
      modelName: 'Certificate',
      timestamps: false
    }
  }
}

module.exports = { CERTIFICATE_TABLE, CertificateSchema, Certificate }
