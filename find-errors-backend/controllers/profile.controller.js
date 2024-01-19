const db = require("../models/index");
const User = db.User;

// Fetch user data function
exports.fetchUserData = async (req, res) => {
  // find user by id
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ["password"],
    },
  });
  return res.send(user);
};
