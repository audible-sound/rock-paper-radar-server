'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = [];
    const postTags = [];
    const userLikes = new Set();

    for (let userId = 1; userId <= 20; userId++) {
      for (let j = 1; j <= 5; j++) {
        const postId = (userId - 1) * 5 + j;
        posts.push({
          userId: userId,
          postTitle: `Amazing trip to ${['Paris', 'Tokyo', 'New York', 'London', 'Sydney'][j - 1]}`,
          pictureUrl: `https://picsum.photos/1920/1080?random=${postId}`,
          postContent: `Had an incredible time exploring ${['Paris', 'Tokyo', 'New York', 'London', 'Sydney'][j - 1]}. The culture, food, and sights were unforgettable!`,
          location: ['Paris', 'Tokyo', 'New York', 'London', 'Sydney'][j - 1],
          postLikes: Math.floor(Math.random() * 100),
          createdAt: new Date(),
          updatedAt: new Date()
        });

        ['Historical', 'Scenery', 'Food', 'Adventure', 'Nature'].forEach(tag => {
          postTags.push({
            name: tag,
            postId: postId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });

        // Generate unique likes
        for (let k = 0; k < Math.floor(Math.random() * 10); k++) {
          const likeUserId = Math.floor(Math.random() * 20) + 1;
          const userPostPair = `${likeUserId}-${postId}`;
          if (!userLikes.has(userPostPair)) {
            userLikes.add(userPostPair);
          }
        }
      }
    }

    // Insert Posts first
    await queryInterface.bulkInsert('Posts', posts, {});

    // Fetch the inserted posts to get their actual IDs
    const insertedPosts = await queryInterface.sequelize.query(
      `SELECT id FROM "Posts" ORDER BY id ASC LIMIT ${posts.length}`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Update postTags with the actual post IDs
    postTags.forEach((tag, index) => {
      tag.postId = insertedPosts[Math.floor(index / 5)].id;
    });

    // Now insert PostTags
    await queryInterface.bulkInsert('PostTags', postTags, {});

    // Create UserLikes array from the unique set
    const userLikesArray = Array.from(userLikes).map(pair => {
      const [userId, postId] = pair.split('-');
      return {
        userId: parseInt(userId),
        postId: parseInt(postId),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Insert UserLikes
    await queryInterface.bulkInsert('UserLikes', userLikesArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserLikes', null, {});
    await queryInterface.bulkDelete('PostTags', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
  }
};