import express from 'express';
import controllers from '../controllers';

const router = express.Router();
const { createUser, signIn } = controllers.users;

router.post('/create-user', createUser);
router.get('/login', signIn);
// router.get('/users', getAllUsers )

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the Home Page' });
});
router.get('/employee', (req, res) => {
  res.json({ message: 'Welcome to Employee Dashboard' });
});
router.get('/admin', (req, res) => {
  res.json({ message: 'Welcome to the Admin Page' });
});

export default router;
