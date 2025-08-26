// api/index.js

import express from 'express';
import authRoutes from './routes/user.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to ShetiMajuri API has created sucess ' });
});
router.use('/auth', authRoutes);

export default router;
