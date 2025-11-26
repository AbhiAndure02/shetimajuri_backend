import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helper/token.helper.js";

// Register
export const registerUser = async (userData) => {
  const existing = await User.findOne({ phone: userData.phone });
  if (existing) throw new Error("User already exists");

  userData.password = await bcrypt.hash(userData.password, 10);
  const user = await User.create(userData);

  const token = generateToken({ id: user._id });
  return { user, token };
};

// Login
export const loginUser = async ({ phone, password }) => {
  const user = await User.findOne({ phone });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({ id: user._id });
  return { user, token };
};

// Get All Users
export const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

// Get User By ID
export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

// Update User By ID
export const updateUserById = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  }).select("-password");
  if (!updatedUser) throw new Error("User not found");
  return updatedUser;
};

// Delete User By ID
export const deleteUserById = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new Error("User not found");
  return;
};
