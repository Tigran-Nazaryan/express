import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Token.init({
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Token',
    tableName: 'Tokens',
    timestamps: true
  });

  return Token;
};
