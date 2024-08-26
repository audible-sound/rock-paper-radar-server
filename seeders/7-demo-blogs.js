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
      staffID: 1,
      blogPicture: 'https://i.natgeofe.com/k/e094f0a9-3cb3-40c3-afaf-314b6437ef14/ww-funny-animal-faces-goat_3x2.jpg',
      blogTitle: 'Lorem Ipsum Dolor',
      blogContent: 'TESTEESTE STSETSE TSETS ETSETS TETET ESTS TSET SETE ',
      blogLikes: 0,
      createdAt: '2024-08-17 18:16:17.978+08',
      updatedAt: '2024-08-17 18:16:17.978+08'
    },{
      staffID: 1,
      blogPicture: 'https://static.vecteezy.com/system/resources/thumbnails/029/554/988/small_2x/surprised-cat-scottish-isolated-on-white-background-generative-ai-photo.jpg',
      blogTitle: 'Lorem Dolor',
      blogContent: 'TElorem ipsum lorem ipsum loremS TSET SETE ',
      blogLikes: 5,
      createdAt: '2024-08-17 18:26:17.978+08',
      updatedAt: '2024-08-17 18:26:17.978+08'
    },{
      staffID: 1,
      blogPicture: 'https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVubnklMjBjYXR8ZW58MHx8MHx8fDA%3D',
      blogTitle: 'My Blog',
      blogContent: 'HEHEHE HEH EHH EEHEHE HEHE HHEH EHEHHE HEH',
      blogLikes: 20,
      createdAt: '2024-08-17 18:36:17.978+08',
      updatedAt: '2024-08-17 18:36:17.978+08'
    },{
      staffID: 2,
      blogPicture: 'https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVubnklMjBjYXR8ZW58MHx8MHx8fDA%3D',
      blogTitle: 'My Blog TESTING TESTING',
      blogContent: 'EH THIS IS A TEST TESTING THIS ONE LA THIS IS A BIG TEST, I AM TESTING',
      blogLikes: 550,
      createdAt: '2024-08-17 18:46:17.978+08',
      updatedAt: '2024-08-17 18:46:17.978+08'
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
