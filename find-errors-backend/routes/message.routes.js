const router = require("express").Router();
const message = require("../controllers/message.controller.js");
const { verifyToken } = require("../middleware/auth.middleware.js");

router.get("/messages", verifyToken, message.findAll);
router.get("/message/:id", verifyToken, message.findOne);
router.post("/message/create", verifyToken, message.create);
router.delete("/message/delete/:id", verifyToken, message.delete);
router.put("/message/update/:id", verifyToken, message.update);
module.exports = router;
