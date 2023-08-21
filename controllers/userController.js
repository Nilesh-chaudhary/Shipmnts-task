const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "user already exists" });
    } else {
      if (name && email && password && password_confirmation) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
            });
            await doc.save();
            const saved_user = await UserModel.findOne({ email: email });
            //Generate JWT token
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "registration successfull",
              token: token,
            });
          } catch (error) {
            res.send({
              status: "failed",
              message: "unable to register",
              error,
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "password and confirm password doesn't match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fielsd are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            //Generate JWT token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "Login successfull",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Invalid login credentials",
            });
          }
        } else {
          res.send({ status: "failed", message: "Not a registered user" });
        }
      } else {
        res.send({ status: "failed", message: "All fielsd are required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to login" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "password and confirm password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "failed",
          message: "password changed successfully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({
            status: "failed",
            message: "password and confirm password doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.send({
            status: "success",
            message: "Password reset Successfully",
          });
        }
      } else {
        res.send({ status: "failed", message: "All field is required" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "INVALID TOKEN" });
    }
  };
}

module.exports = UserController;
