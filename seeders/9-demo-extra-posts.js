'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = [];
    const postTags = [];
    const userLikes = new Set();

    for (let i = 1; i <= 100; i++) {
      const userId = faker.number.int({ min: 1, max: 100 });
      const postId = posts.length + 1;
      const createdAt = faker.date.between({ from: new Date('2024-01-01'), to: new Date('2024-12-31') });
      posts.push({
        userId: userId,
        postTitle: faker.lorem.sentence(),
        pictureUrl: faker.image.url(),
        postContent: faker.lorem.paragraph(),
        location: faker.location.city(),
        postLikes: faker.number.int({ min: 0, max: 50 }),
        createdAt: createdAt,
        updatedAt: createdAt
      });

      const categories = ['Historical', 'Scenery', 'Food', 'Adventure', 'Nature'];
      const numTags = faker.number.int({ min: 1, max: 3 });
      const selectedCategories = faker.helpers.arrayElements(categories, numTags);
      for (let category of selectedCategories) {
        postTags.push({
          name: category,
          postId: postId,
          createdAt: createdAt,
          updatedAt: createdAt
        });
      }

      const numLikes = faker.number.int({ min: 0, max: 20 });
      for (let k = 0; k < numLikes; k++) {
        const likeUserId = faker.number.int({ min: 1, max: 100 });
        const userPostPair = `${likeUserId}-${postId}`;
        if (!userLikes.has(userPostPair)) {
          userLikes.add(userPostPair);
        }
      }
    }

    await queryInterface.bulkInsert('Posts', posts, {});
    await queryInterface.bulkInsert('PostTags', postTags, {});

    const userLikesArray = Array.from(userLikes).map(pair => {
      const [userId, postId] = pair.split('-');
      const createdAt = faker.date.between({ from: new Date('2024-01-01'), to: new Date('2024-12-31') });
      return {
        userId: parseInt(userId),
        postId: parseInt(postId),
        createdAt: createdAt,
        updatedAt: createdAt
      };
    });

    await queryInterface.bulkInsert('UserLikes', userLikesArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserLikes', null, {});
    await queryInterface.bulkDelete('PostTags', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
