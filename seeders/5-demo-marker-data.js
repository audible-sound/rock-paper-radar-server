'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const markerData = [];

    for (let i = 1; i <= 200; i++) {
      const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
      markerData.push({
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
        type: faker.helpers.arrayElement(['garbage', 'traffic', 'camera']),
        userId: faker.number.int({ min: 1, max: 100 }),
        createdAt: createdAt,
        updatedAt: createdAt
      });
    }

    await queryInterface.bulkInsert('MarkerData', markerData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MarkerData', null, {});
  }
};