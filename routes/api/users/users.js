const express = require("express");
const router = express.Router();
const validate = require("./validation");
const userController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.post("/auth/register", validate.createUser, userController.reg);

router.post("/login", validate.loginUser, userController.login);

router.post("/logout", guard, userController.logout);

router.get("/current", guard, userController.currentUser);

router.patch(
  "/update",
  [guard, upload.single("avatar"), validate.validateUploadAvatar],
  userController.updateUser
);

router.get("/verify/:verifyToken", userController.verify);

module.exports = router;
