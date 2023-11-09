const User = require("../models/User.js");
const CryptoJS = require("crypto-js");

const signUpController = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.HASH__KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).send({
      data: savedUser,
      resultMessage: "ugurla yarandu",
      isSucces: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const signInController = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.send(401).json("worng user");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.HASH__KEY
    );
    const password = hashedPassword.toString(CryptoJS.enc.Utf8);
    password !== req.body.password && res.send(401).json("worng pword");

    res
      .status(200)
      .json({ data: user, isSucces: true, resultMessage: "ugurlu login" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { signInController, signUpController };
