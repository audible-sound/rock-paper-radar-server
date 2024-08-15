'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const markerData = [];

    for (let i = 1; i <= 50; i++) {
      markerData.push({
        lat: (Math.random() * 180) - 90,
        lng: (Math.random() * 360) - 180,
        type: ['garbage', 'traffic', 'camera'][i % 3],
        userId: Math.floor(Math.random() * 20) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('MarkerData', markerData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MarkerData', null, {});
  }
};