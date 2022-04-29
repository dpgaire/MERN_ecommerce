import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

//@desc    Auth user & get token
//@route  POST /api/users/login
//@acsess  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

//@desc    Register new user
//@route  POST /api/users/register
//@acsess  Private
export const regiserUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc    Get user profile
//@route  GET /api/users/profile
//@acsess  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

//@desc    Get user profile
//@route  GET /api/users/profile
//@acsess  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user){
    user.name=req.body.name || user.name
    user.email = req.body.email || user.email;

    if(req.body.password){
      user.password=req.body.password 
    }

    const updateUser= await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
  })}
  
  else {
    res.status(401);
    throw new Error("User not found");
  }
});
