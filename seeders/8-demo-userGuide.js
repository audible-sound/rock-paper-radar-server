'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('userGuides', [{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Post Management',
      title: 'Create Post',
      content: 'Steps to create a post...',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Post Management',
      title: 'Edit Post',
      content: 'Steps to edit an existing post...',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Post Management',
      title: 'Delete Post',
      content: 'Steps to delete a post...',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Comment Guidelines',
      title: 'Managing Comments',
      content: 'Steps to manage comments effectively...',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Comment Guidelines',
      title: 'Moderating Comments',
      content: 'Guidelines for moderating comments...',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Likes',
      title: 'Managing Likes',
      content: 'How to manage likes effectively...',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 1,
      forUserType: 'Normal User',
      section: 'Map Guidance',
      title: 'Icons',
      content: 'How to click on icons...',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 2,
      forUserType: 'Normal User',
      section: 'Map Guidance',
      title: 'Moderating Comments',
      content: 'Guidelines for moderating comments...',
      createdAt: new Date(),
      updatedAt: new Date
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
