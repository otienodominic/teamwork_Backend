import express from 'express';
import controllers from '../controllers';

const router = express.Router();
const { createUser, signIn } = controllers.users;

router.post('/user', createUser);
router.get('/user', signIn);

export default router;
