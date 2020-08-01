"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .addColumn("Registrations", "user", {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      })
      .then(
        async () =>
          await queryInterface.addColumn("Registrations", "course", {
            type: Sequelize.UUID,
            references: {
              model: "Courses",
              key: "id",
            },
          })
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Registrations", "user").then(async () => {
      await queryInterface.removeColumn("Registrations", "course")
    });
  },
};
