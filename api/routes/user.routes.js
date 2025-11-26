import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controller/user.controller.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers); // Can be public or protected

// Protected routes (add auth middleware if required)
router.post("/logout", logoutUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
