import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/authorize';

const router = express.Router();
const { createUser, signIn } = controllers.users;
const { authRole, authUser } = authorize;

router.post('/create-user', authUser, createUser);
router.get('/login', signIn);
// router.get('/users', getAllUsers )

router.get('/dashboard', authUser, (req, res) => {
  res.json({ message: 'Welcome to the Home Page' });
});
router.get('/employee', authUser, (req, res) => {
  res.json({ message: 'Welcome to Employee Dashboard' });
});
router.get('/admin', authUser, (req, res) => {
  res.json({ message: 'Welcome to the Admin Page' });
});

export default router;
