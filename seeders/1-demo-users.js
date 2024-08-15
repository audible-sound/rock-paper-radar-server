'use strict';
const { hashPassword } = require('../helpers/encryption.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const userProfiles = [];

    for (let i = 1; i <= 20; i++) {
      const hashedPassword = await hashPassword('password123');
      users.push({
        username: `user${i}`,
        password: hashedPassword,
        email: `user${i}@example.com`,
        birthDate: new Date(1990, 0, i),
        gender: i % 2 === 0 ? 'male' : 'female',
        country: ['USA', 'Canada', 'UK', 'Australia', 'Japan'][i % 5],
        phoneNumber: `+1${String(i).padStart(10, '0')}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      userProfiles.push({
        userId: i,
        profileDescription: `I'm user ${i}, and I love traveling!`,
        profilePictureUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('UserProfiles', userProfiles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserProfiles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};