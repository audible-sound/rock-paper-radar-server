'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('blogs', [{
      id: 1,
      staffID: 1,
      blogPicture: 'http://test.com/',
      blogTitle: 'Lorem Ipsum Dolor',
      blogContent: 'TESTEESTE STSETSE TSETS ETSETS TETET ESTS TSET SETE ',
      blogLikes: 0,
      createdAt: '2024-08-17 18:56:17.978+08',
      updatedAt: '2024-08-17 18:56:17.978+08'
    },{
      id: 2,
      staffID: 1,
      blogPicture: 'http://test.com/',
      blogTitle: 'Lorem Dolor',
      blogContent: 'TElorem ipsum lorem ipsum loremS TSET SETE ',
      blogLikes: 5,
      createdAt: '2024-08-17 18:56:17.978+08',
      updatedAt: '2024-08-17 18:56:17.978+08'
    },{
      id: 3,
      staffID: 1,
      blogPicture: 'http://test.com/',
      blogTitle: 'My Blog',
      blogContent: 'HEHEHE HEH EHH EEHEHE HEHE HHEH EHEHHE HEH',
      blogLikes: 20,
      createdAt: '2024-08-17 18:56:17.978+08',
      updatedAt: '2024-08-17 18:56:17.978+08'
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
