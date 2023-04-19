const express = require("express");
const User = require("../../model/user");
const { generateJWT } = require("../../model/token");

async function register(req, res, next) {
  let newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };

  let user = await User.findOne({
    username: req.body.username,
  })
    .lean()
    .exec();

  if (user)
    return res.status(200).send({
      status: "error",
      message: "User already registered",
    });

  newUser = new User(newUser);
  await newUser.save();

  res.status(200).send({
    status: "success",
    data: newUser,
  });
}

async function login(req, res, next) {
  let user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .lean()
    .exec();

  if (!user)
    return res.status(200).send({
      status: "error",
      message: "Please enter valid username or password",
    });

  user = await User.findOne({ _id: user._id })
    .select({
      name: 1,
      username: 1,
      createdAt: 1,
    })
    .lean()
    .exec();

  const token = await generateJWT(user);

  res.status(200).send({
    status: "success",
    message: "Login successful",
    token: token,
  });
}

async function userDetails(req, res, next) {
  console.log("userDetails")
}

module.exports = {
  register,
  login,
  userDetails,
};

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();
//     res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });
//     res.redirect("/users/me");
//   } catch (error) {
//     res.status(400).send();
//   }
// });
