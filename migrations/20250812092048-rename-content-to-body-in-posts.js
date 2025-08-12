'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Posts', 'content', 'body');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Posts', 'body', 'content');
  }
};
