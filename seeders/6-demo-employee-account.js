'use strict';
const { hashPassword } = require('../helpers/encryption.js');
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
      id: 50,
      fullName: 'Albert Tan',
      username: 'test',
      password: '$2b$10$V0Rq4ByV/3XzLDZxISZfBeJPIoZ6Lg/Jaj4Ps.ZXLO.r0QoEB7iOa',
      userType: 'admin',
      email: 'test@gmail.com',
      birthDate: '2005-12-23 08:00:00+08',
      gender: 'male',
      country: 'Malaysia',
      phoneNumber: '0192718776',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 51,
      fullName: 'Test account 2',
      username: 'testing2',
      password: '$2b$10$V0Rq4ByV/3XzLDZxISZfBeJPIoZ6Lg/Jaj4Ps.ZXLO.r0QoEB7iOa',
      userType: 'admin',
      email: 'testing@gmail.com',
      birthDate: '2005-12-23 08:00:00+08',
      gender: 'male',
      country: 'Malaysia',
      phoneNumber: '0192618776',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('staffProfiles', [{
      staffID: 50,
      profileDescription: 'test',
      pictureUrl: 'https://pbs.twimg.com/media/CT8iWc8VEAAGdNX.jpg',
      createdAt: new Date(),
      updatedAt: new Date
    },{
      staffID: 51,
      profileDescription: 'test',
      pictureUrl: 'https://pbs.twimg.com/media/CT8iWc8VEAAGdNX.jpg',
      createdAt: new Date(),
      updatedAt: new Date
    }])

    const users = [];
    const userProfiles = [];

    for (let i = 1; i <= 20; i++) {
      const hashedPassword = await hashPassword('password123');
      users.push({
        fullName: `employee${i}`,
        username: `employee${i}`,
        password: hashedPassword,
        userType: i % 2 === 0 ? 'admin' : 'staff',
        email: `user${i}@example.com`,
        birthDate: new Date(1990, 0, i),
        gender: i % 2 === 0 ? 'male' : 'female',
        country: ['USA', 'Canada', 'UK', 'Australia', 'Japan'][i % 5],
        phoneNumber: `+1${String(i).padStart(10, '0')}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      userProfiles.push({
        staffID: i,
        profileDescription: `I'm staff ${i}, and I love traveling!`,
        pictureUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('staffs', users, {});
    await queryInterface.bulkInsert('staffProfiles', userProfiles, {});
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
