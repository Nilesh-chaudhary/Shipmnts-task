const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const checkUserAuth = require("../middlewares/auth-middleware.js");

// Route level Middleware
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

// PUBLIC ROUTE
router.post("/register", function (req, res) {
  UserController.userRegistration;
});
router.post("/login", function (req, res) {
  UserController.userLogin;
});
// router.post("/send-reset-password-email", function (req, res) {
//   UserController.sendUserPasswordResetEmail;
// });
// router.post("/reset-password/:id/:token", UserController.userPasswordReset);

// // PROTECTED ROUTE
// router.post("/changepassword", UserController.changeUserPassword);
// router.get("/loggeduser", UserController.loggedUser);

module.exports = router;
