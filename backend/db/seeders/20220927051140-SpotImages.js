'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://i.imgur.com/uzNJXom.jpg',//url from imgur
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/ogodRiT.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/LQbwHxE.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/lvTlgIT.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/OrZWwBG.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/pSjM433.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/mZKvmiu.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/7cLUKMA.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/TCEnY0u.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://i.imgur.com/lh1bDAa.jpg',
        preview: true
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('SpotImages', {});
  }
};
