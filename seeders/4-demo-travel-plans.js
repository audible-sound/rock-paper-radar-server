'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const travelPlans = [];
    const travelTags = [];

    for (let userId = 1; userId <= 100; userId++) {
      const numPlans = faker.number.int({ min: 0, max: 3 });
      for (let i = 0; i < numPlans; i++) {
        const travelPlanId = travelPlans.length + 1;
        const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
        
        travelPlans.push({
          userId: userId,
          title: faker.lorem.sentence(),
          duration: faker.number.int({ min: 1, max: 30 }),
          location: faker.location.country(),
          pictureUrl: faker.image.url(),
          createdAt: createdAt,
          updatedAt: createdAt
        });

        const categories = ['Historical', 'Scenery', 'Food', 'Adventure', 'Nature'];
        const numTags = faker.number.int({ min: 1, max: 3 });
        const selectedCategories = faker.helpers.arrayElements(categories, numTags);
        for (let category of selectedCategories) {
          travelTags.push({
            name: category,
            travelId: travelPlanId,
            createdAt: createdAt,
            updatedAt: createdAt
          });
        }
      }
    }

    await queryInterface.bulkInsert('TravelPlans', travelPlans, {});
    await queryInterface.bulkInsert('TravelTags', travelTags, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TravelTags', null, {});
    await queryInterface.bulkDelete('TravelPlans', null, {});
  }
};