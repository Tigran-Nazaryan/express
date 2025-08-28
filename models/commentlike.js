'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CommentLike extends Model {
    static associate(models) {
      CommentLike.belongsTo(models.User, { foreignKey: 'userId' });
      CommentLike.belongsTo(models.Comment, { foreignKey: 'commentId', onDelete: 'CASCADE' });
    }
  }

  CommentLike.init(
      {
        userId: { type: DataTypes.INTEGER, allowNull: false },
        commentId: { type: DataTypes.INTEGER, allowNull: false },
      },
      {
        sequelize,
        modelName: 'CommentLike',
        tableName: 'CommentLikes',
        timestamps: true,
      }
  );

  return CommentLike;
};
