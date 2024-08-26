'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [];
    const posts = await queryInterface.sequelize.query(
      `SELECT id FROM "Posts"`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    for (let post of posts) {
      const numComments = faker.number.int({ min: 0, max: 5 });
      for (let i = 0; i < numComments; i++) {
        const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
        comments.push({
          userId: faker.number.int({ min: 1, max: 100 }),
          postId: post.id,
          commentContent: faker.lorem.sentence(),
          createdAt: createdAt,
          updatedAt: createdAt
        });
      }
    }

    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};