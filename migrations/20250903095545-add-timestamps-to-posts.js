'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    });

    await queryInterface.addColumn('Posts', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'createdAt');
    await queryInterface.removeColumn('Posts', 'updatedAt');
  },
};
