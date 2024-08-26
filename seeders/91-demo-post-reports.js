'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postReports = [];
    const postBans = [];

    for (let i = 1; i <= 20; i++) {
      postReports.push({
        userId: Math.floor(Math.random() * 20) + 1, // Assuming there are 20 users
        postId: Math.floor(Math.random() * 100) + 1, // Assuming there are 100 posts
        reportContent: ['Inappropriate content', 'Spam', 'Offensive language', 'Misinformation', 'Copyright violation'][Math.floor(Math.random() * 5)],
        reportState: ['Unreviewed', 'False Report', 'Banned'][Math.floor(Math.random() * 3)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('ReportPosts', postReports, {});

    for(let counter = 1; counter<20; counter++){
      if(postReports[counter].reportState == "Banned"){
        postBans.push({
          reportId: counter,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }

    await queryInterface.bulkInsert('BannedPosts', postBans, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ReportPosts', null, {});
  }
};