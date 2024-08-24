'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('userGuides', [{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Post Management',
      title: 'Create Post',
      content: 'Learn how to create a new post, including selecting the right category, adding images, and publishing it to your feed for maximum engagement.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Post Management',
      title: 'Edit Post',
      content: 'Follow these steps to edit an existing post: change text, update images, adjust categories, and republish to keep your content up-to-date.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Post Management',
      title: 'Delete Post',
      content: 'Understand the process for deleting a post from your feed, ensuring unwanted content is removed and maintaining the integrity of your profile.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Comment Guidelines',
      title: 'Managing Comments',
      content: 'Discover how to manage comments on your posts: approve, reply, or delete to maintain a positive and engaging discussion environment.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Comment Guidelines',
      title: 'Moderating Comments',
      content: 'Guidelines on moderating comments effectively, including identifying and addressing inappropriate content while fostering healthy discussions.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Likes',
      title: 'Managing Likes',
      content: 'Learn how to view and manage likes on your posts, understand engagement metrics, and encourage more interactions from your followers.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Map Guidance',
      title: 'Icons',
      content: 'A guide to understanding and interacting with map icons, including how to click, navigate, and use them for effective map exploration.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 2,
      forUserType: 'Normal User',
      section: 'Map Guidance',
      title: 'Moderating Comments',
      content: 'Detailed instructions on moderating comments, ensuring your platform remains user-friendly and free from harmful or inappropriate content.',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
