import * as UserService from '../service/user.service.js';



export const register = async (req, res) => {
  try {
    const { user, token } = await UserService.registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await UserService.loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const addFamilyMember = async (req, res) => {
  try {
    const userId = req.user.id;

    const newMember = await UserService.addFamilyMember(userId, req.body);

    res.status(201).json({
      message: 'Family member added successfully',
      member: newMember,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};