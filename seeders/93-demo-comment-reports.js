'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const commentReports = [];
    const commentBans = [];

    for (let i = 1; i <= 20; i++) {
      commentReports.push({
        userId: Math.floor(Math.random() * 20) + 1, // Assuming there are 20 users
        commentId: Math.floor(Math.random() * 20) + 1,
        reportContent: ['Inappropriate behavior', 'Harassment', 'Spam', 'Fake account', 'Offensive language'][Math.floor(Math.random() * 5)],
        reportState: ['Unreviewed', 'False Report', 'Banned'][Math.floor(Math.random() * 3)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('ReportComments', commentReports, {});

    for(let counter = 1; counter<20; counter++){
      if(commentReports[counter].reportState == "Banned"){
        commentBans.push({
          reportId: counter,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }

    await queryInterface.bulkInsert('BannedComments', commentBans, {});
  },

  down: async (queryInterface, Sequelize) => {
  }
};