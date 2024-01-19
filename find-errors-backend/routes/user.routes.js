const user = require("../controllers/user.controller");
let router = require("express").Router();

router.post("/sign-up", user.registerUser);
router.post("/sign-in", user.signInUser);
router.post("/refresh-token", user.refreshToken);

module.exports = router;
