module.exports = (sequalize, Sequelize) => {
  const AuthToken = sequalize.define("AuthToken", {
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });
  return AuthToken;
};
