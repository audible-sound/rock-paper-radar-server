'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userReports = [];

    for (let i = 1; i <= 20; i++) {
      userReports.push({
        userId: Math.floor(Math.random() * 20) + 1, // Assuming there are 20 users
        reportContent: ['Inappropriate behavior', 'Harassment', 'Spam', 'Fake account', 'Offensive language'][Math.floor(Math.random() * 5)],
        reportState: ['Unreviewed', 'False Report', 'Banned'][Math.floor(Math.random() * 3)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('userReports', userReports, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userReports', null, {});
  }
};