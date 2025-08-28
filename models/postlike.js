'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
      PostLike.belongsTo(models.User, { foreignKey: 'userId' });
      PostLike.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
    }
  }

  PostLike.init(
      {
        userId: { type: DataTypes.INTEGER, allowNull: false },
        postId: { type: DataTypes.INTEGER, allowNull: false },
      },
      {
        sequelize,
        modelName: 'PostLike',
        tableName: 'PostLikes',
        timestamps: true,
      }
  );

  return PostLike;
};
