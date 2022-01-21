const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken = require("../utils/generateToken");

// registration
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    licenseNumber,
    licenseStart,
    licenseEnd,
    address,
    phoneNumber,
    website,
    pic,
  } = req.body;

  const userExists = await User.findOne({ email });

  //check duplicate email = user is existing
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //if not exists, create a new user
  const user = await User.create({
    name,
    email,
    password,
    licenseNumber,
    licenseStart,
    licenseEnd,
    address,
    phoneNumber,
    website,
    pic,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      status: user.status,
      licenseNumber: user.licenseNumber,
      licenseStart: user.licenseStart,
      licenseEnd: user.licenseEnd,
      address: user.address,
      phoneNumber: user.phoneNumber,
      website: user.website,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

// Log in
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find email
  const user = await User.findOne({ email });

  //if success
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      status: user.status,
      licenseNumber: user.licenseNumber,
      licenseStart: user.licenseStart,
      licenseEnd: user.licenseEnd,
      address: user.address,
      phoneNumber: user.phoneNumber,
      website: user.website,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Pssword!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // need user id
  const user = await User.findById(req.user._id);
  //if user exists
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    //if the body contains password, only then we can update
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    //send information to frontend
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      licenseNumber: updatedUser.licenseNumber,
      licenseStart: updatedUser.licenseStart,
      licenseEnd: updatedUser.licenseEnd,
      address: updatedUser.address,
      phoneNumber: updatedUser.phoneNumber,
      website: updatedUser.website,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const getUsersforAdmin = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});

  res.json(allUsers);
});

const getUserByName = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User is not found!" });
  }
};

module.exports = {
  registerUser,
  authUser,
  updateUserProfile,
  getUsersforAdmin,
  getUserByName,
};
