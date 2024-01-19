module.exports = (sequalize, Sequelize) => {
  const Message = sequalize.define(
    "Message",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
        defaultValue: "Not defined",
      },
      user: {
        type: Sequelize.INTEGER,
        //allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },

    {
      underscored: true,
    }
  );
  return Message;
};
