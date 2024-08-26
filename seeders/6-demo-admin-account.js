'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const staffs = [];
    const staffProfiles = [];

    for (let i = 1; i <= 5; i++) {
      const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
      staffs.push({
        fullName: faker.person.fullName(),
        username: faker.internet.userName(),
        password: '$2b$10$V0Rq4ByV/3XzLDZxISZfBeJPIoZ6Lg/Jaj4Ps.ZXLO.r0QoEB7iOa', // You might want to use a proper hashing function here
        userType: 'admin',
        email: faker.internet.email(),
        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        gender: faker.person.sex(),
        country: faker.location.country(),
        phoneNumber: faker.phone.number(),
        createdAt: createdAt,
        updatedAt: createdAt
      });

      staffProfiles.push({
        staffID: i,
        profileDescription: faker.lorem.sentence(),
        pictureUrl: faker.image.avatar(),
        createdAt: createdAt,
        updatedAt: createdAt
      });
    }

    await queryInterface.bulkInsert('staffs', staffs);
    await queryInterface.bulkInsert('staffProfiles', staffProfiles);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('staffProfiles', null, {});
    await queryInterface.bulkDelete('staffs', null, {});
  }
};
