'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = [];
    const postTags = [];
    const userLikes = new Set();

    for (let userId = 1; userId <= 100; userId++) {
      const numPosts = faker.number.int({ min: 1, max: 5 });
      for (let j = 1; j <= numPosts; j++) {
        const postId = posts.length + 1;
        const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
        posts.push({
          userId: userId,
          postTitle: faker.lorem.sentence(),
          pictureUrl: faker.image.url(),
          postContent: faker.lorem.paragraph(),
          location: faker.location.city(),
          postLikes: faker.number.int({ min: 0, max: 100 }),
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
    }

    await queryInterface.bulkInsert('Posts', posts, {});
    await queryInterface.bulkInsert('PostTags', postTags, {});

    const userLikesArray = Array.from(userLikes).map(pair => {
      const [userId, postId] = pair.split('-');
      const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
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