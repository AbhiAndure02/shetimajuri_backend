import * as UserService from "../service/user.service.js";

// Register
export const registerUser = async (req, res) => {
  try {
    
    const { user, token } = await UserService.registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { user, token } = await UserService.loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
    // For stateless JWT, just return success. Client should remove token.
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User By ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update User By ID
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUserById(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete User By ID
export const deleteUserById = async (req, res) => {
  try {
    await UserService.deleteUserById(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
