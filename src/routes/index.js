import express from 'express';
import userCtrl from '../controllers/users';

const router = express.Router();

router.post('/user', userCtrl.createUser);

export default router;
