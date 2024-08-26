'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bannedUsers = [];
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" ORDER BY RANDOM() LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    for (let user of users) {
      const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
      bannedUsers.push({
        userID: user.id,
        reportID: null, // Assuming reportID can be null
        timestampUnbanned: faker.date.future({ refDate: createdAt }),
        createdAt: createdAt,
        updatedAt: createdAt
      });
    }

    await queryInterface.bulkInsert('userBans', bannedUsers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userBans', null, {});
  }
};
