'use strict';
const { hashPassword } = require('../helpers/encryption.js');
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const userProfiles = [];

    for (let i = 1; i <= 100; i++) {
      const hashedPassword = await hashPassword('password123');
      const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
      users.push({
        username: faker.internet.userName(),
        password: hashedPassword,
        email: faker.internet.email(),
        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        gender: faker.person.sex(),
        country: faker.location.country(),
        phoneNumber: faker.phone.number(),
        createdAt: createdAt,
        updatedAt: createdAt
      });

      userProfiles.push({
        userId: i,
        profileDescription: faker.lorem.sentence(),
        profilePictureUrl: faker.image.avatar(),
        createdAt: createdAt,
        updatedAt: createdAt
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