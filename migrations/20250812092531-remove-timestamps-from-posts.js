export async function up(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Posts', 'createdAt');
  await queryInterface.removeColumn('Posts', 'updatedAt');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('Posts', 'createdAt', {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
  });
  await queryInterface.addColumn('Posts', 'updatedAt', {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
  });
}
