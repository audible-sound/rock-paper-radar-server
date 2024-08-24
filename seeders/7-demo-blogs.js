'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('blogs', [{
      staffID: 51,
      blogPicture: 'https://images.unsplash.com/photo-1724368202141-ef6f3522f50f?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'Exploring the Hidden Gems of Europe',
      blogContent: 'Discover stunning, lesser-known destinations in Europe. From quaint French villages to Norways fjords, these hidden gems offer authentic experiences away from tourist crowds.',
      blogLikes: 45,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 50,
      blogPicture: 'https://images.unsplash.com/photo-1723821281511-bc0deb3851d7?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'Adventures in the Amazon Rainforest',
      blogContent: 'Journey through the Amazon, experiencing its rich biodiversity and cultures. Trek through untouched wilderness and discover hidden waterfalls in this unique world.',
      blogLikes: 60,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 51,
      blogPicture: 'https://plus.unsplash.com/premium_photo-1677002240252-af3f88114efc?q=80&w=3225&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'A Culinary Journey through Southeast Asia',
      blogContent: 'Explore vibrant street food and culinary traditions in Southeast Asia. From Bangkok to Hanoi, discover the flavors and stories behind each dish on this enriching journey.',
      blogLikes: 75,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 51,
      blogPicture: 'https://images.unsplash.com/photo-1519998334409-c7c6b1147f65?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'The Magic of the Northern Lights',
      blogContent: 'Chase the aurora borealis in the Arctic Circle. This guide helps you experience the Northern Lights, offering tips, prime locations, and insights into this natural wonder.',
      blogLikes: 90,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 50,
      blogPicture: 'https://images.unsplash.com/photo-1724368202141-ef6f3522f50f?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'Island Hopping in the Caribbean',
      blogContent: 'A dream vacation in the Caribbean: explore beautiful islands, beaches, and rich local culture. From Bahamas beaches to Puerto Ricos rainforests, adventure awaits.',
      blogLikes: 105,
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('blogs', [{
      staffID: 51,
      blogPicture: 'https://images.unsplash.com/photo-1723821281511-bc0deb3851d7?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'Exploring the Hidden Gems of Europe',
      blogContent: 'Discover stunning, lesser-known destinations in Europe. From quaint French villages to Norways fjords, these hidden gems offer authentic experiences away from tourist crowds.',
      blogLikes: 45,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 50,
      blogPicture: 'https://plus.unsplash.com/premium_photo-1677002240252-af3f88114efc?q=80&w=3225&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'Adventures in the Amazon Rainforest',
      blogContent: 'Journey through the Amazon, experiencing its rich biodiversity and cultures. Trek through untouched wilderness and discover hidden waterfalls in this unique world.',
      blogLikes: 60,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 51,
      blogPicture: 'https://images.unsplash.com/photo-1519998334409-c7c6b1147f65?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'A Culinary Journey through Southeast Asia',
      blogContent: 'Explore vibrant street food and culinary traditions in Southeast Asia. From Bangkok to Hanoi, discover the flavors and stories behind each dish on this enriching journey.',
      blogLikes: 75,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 51,
      blogPicture: 'https://images.unsplash.com/photo-1724368202141-ef6f3522f50f?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'The Magic of the Northern Lights',
      blogContent: 'Chase the aurora borealis in the Arctic Circle. This guide helps you experience the Northern Lights, offering tips, prime locations, and insights into this natural wonder.',
      blogLikes: 90,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      staffID: 50,
      blogPicture: 'https://images.unsplash.com/photo-1723821281511-bc0deb3851d7?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      blogTitle: 'Island Hopping in the Caribbean',
      blogContent: 'A dream vacation in the Caribbean: explore beautiful islands, beaches, and rich local culture. From Bahamas beaches to Puerto Ricos rainforests, adventure awaits.',
      blogLikes: 105,
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
