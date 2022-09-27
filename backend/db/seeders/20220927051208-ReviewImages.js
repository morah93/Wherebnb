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
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'imgrev1.com'
      },
      {
        reviewId: 2,
        url: 'imgrev2.com'
      },
      {
        reviewId: 3,
        url: 'imgrev3.com'
      },
      {
        reviewId: 4,
        url: 'imgrev4.com'
      },
      {
        reviewId: 5,
        url: 'imgrev5.com'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('ReviewImages', {});
  }
};
