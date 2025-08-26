import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../helper/token.helper.js';

export const registerUser = async (userData) => {
  const existing = await User.findOne({ phone: userData.phone });
  if (existing) throw new Error('User already exists');

  userData.password = await bcrypt.hash(userData.password, 10);
  const user = await User.create(userData);
  const token = generateToken({ id: user._id, role: user.role });

  return { user, token };
};

export const loginUser = async ({ phone, password }) => {
  const user = await User.findOne({ phone });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = generateToken({ id: user._id, role: user.role });
  return { user, token };
};
// service/user.service.js


export const addFamilyMember = async (userId, memberData) => {
  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Add the family member data to the user's familyMembers array
  user.familyMembers.push(memberData);

  // Save the updated user
  await user.save();

  // Return the newly added family member
  return user.familyMembers[user.familyMembers.length - 1];
};

export const getAllUser = async (currentUser) => {
  if (currentUser.role !== 'admin') {
    throw new Error("You don't have access");
  }

  const users = await User.find().select("-password");
  return users;
};
