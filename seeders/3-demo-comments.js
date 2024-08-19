'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [];

    for (let postId = 1; postId <= 100; postId++) {
      for (let i = 1; i <= 3; i++) {
        comments.push({
          userId: Math.floor(Math.random() * 20) + 1,
          postId: postId,
          commentContent: `Great post! I ${['loved', 'enjoyed', 'appreciated'][i - 1]} seeing your travel experience.`,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};