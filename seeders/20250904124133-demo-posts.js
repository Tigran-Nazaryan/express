'use strict';

export default {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Posts', [
      {
        title: 'post',
        body: 'test post',
        author: 'Admin',
        avatar: "https://avatars.githubusercontent.com/u/4237739",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'post',
        body: 'test post',
        author: 'admin',
        avatar: "https://avatars.githubusercontent.com/u/4237739",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
