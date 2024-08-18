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

    await queryInterface.bulkInsert('staffs', [{
      fullName: 'Albert Tan',
      username: 'test',
      password: '$2b$10$V0Rq4ByV/3XzLDZxISZfBeJPIoZ6Lg/Jaj4Ps.ZXLO.r0QoEB7iOa',
      userType: 'admin',
      email: 'test@gmail.com',
      birthDate: '2005-12-23 08:00:00+08',
      gender: 'male',
      country: 'Malaysia',
      phoneNumber: '0192718776',
      createdAt: '2024-08-17 17:56:17.978+08',
      updatedAt: '2024-08-17 17:56:17.978+08'
    },{
      fullName: 'Test account 2',
      username: 'testing2',
      password: '$2b$10$V0Rq4ByV/3XzLDZxISZfBeJPIoZ6Lg/Jaj4Ps.ZXLO.r0QoEB7iOa',
      userType: 'admin',
      email: 'testing@gmail.com',
      birthDate: '2005-12-23 08:00:00+08',
      gender: 'male',
      country: 'Malaysia',
      phoneNumber: '0192618776',
      createdAt: '2024-08-17 17:56:17.978+08',
      updatedAt: '2024-08-17 17:56:17.978+08'
    }])

    await queryInterface.bulkInsert('staffProfiles', [{
      id: 1,
      staffID: 1,
      profileDescription: 'test',
      pictureUrl: 'https://pbs.twimg.com/media/CT8iWc8VEAAGdNX.jpg',
      createdAt: '2024-08-17 17:56:17.978+08',
      updatedAt: '2024-08-17 17:56:17.978+08'
    },{
      id: 2,
      staffID: 2,
      profileDescription: 'test',
      pictureUrl: 'https://pbs.twimg.com/media/CT8iWc8VEAAGdNX.jpg',
      createdAt: '2024-08-17 17:56:17.978+08',
      updatedAt: '2024-08-17 17:56:17.978+08'
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
