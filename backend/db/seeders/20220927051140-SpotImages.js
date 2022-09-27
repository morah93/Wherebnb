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
        url: 'pic1.com',
        preview: true
      },
      {
        spotId: 2,
        url: 'pic2.com',
        preview: true
      },
      {
        spotId: 3,
        url: 'pic3.com',
        preview: true
      },
      {
        spotId: 4,
        url: 'pic4.com',
        preview: true
      },
      {
        spotId: 5,
        url: 'pic5.com',
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
