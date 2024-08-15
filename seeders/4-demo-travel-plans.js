'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const travelPlans = [];
    const travelTags = [];

    for (let userId = 1; userId <= 20; userId++) {
      for (let i = 1; i <= 2; i++) {
        const travelPlanId = (userId - 1) * 2 + i;
        travelPlans.push({
          userId: userId,
          title: `${['Summer', 'Winter'][i - 1]} vacation in ${['Greece', 'Switzerland'][i - 1]}`,
          duration: Math.floor(Math.random() * 14) + 7,
          location: ['Greece', 'Switzerland'][i - 1],
          pictureUrl: `https://picsum.photos/1920/1080?random=${travelPlanId}`,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        ['Relaxation', 'Adventure', 'Sightseeing', 'Culture'].forEach(tag => {
          travelTags.push({
            name: tag,
            travelId: travelPlanId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
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