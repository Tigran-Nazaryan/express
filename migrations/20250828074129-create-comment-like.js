'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommentLikes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'RESTRICT',
      },
      commentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Comments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('CommentLikes', {
      fields: ['userId', 'commentId'],
      type: 'unique',
      name: 'unique_comment_like_per_user',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CommentLikes');
  },
};
