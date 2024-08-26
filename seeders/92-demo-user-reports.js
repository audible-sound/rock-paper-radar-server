'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userReports = [];
    const banList = [];
    const userBans = [];

    for (let i = 1; i <= 20; i++) {
      userReports.push({
        userId: Math.floor(Math.random() * 20) + 1, // Assuming there are 20 users
        reportedUserId: Math.floor(Math.random() * 20) + 1,
        reportContent: ['Inappropriate behavior', 'Harassment', 'Spam', 'Fake account', 'Offensive language'][Math.floor(Math.random() * 5)],
        reportState: ['Unreviewed', 'False Report', 'Banned'][Math.floor(Math.random() * 3)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('userReports', userReports, {});

    for(let counter = 1; counter<20; counter++){
      if(userReports[counter].reportState == "Banned" && !(banList.includes(userReports[counter].reportedUserId))){
        banList.push(userReports[counter].reportedUserId);
        userBans.push({
          reportID: counter,
          userID: userReports[counter].reportedUserId,
          timestampUnbanned: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }

    await queryInterface.bulkInsert('userBans', userBans, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userReports', null, {});
  }
};