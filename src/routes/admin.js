import express from 'express';
// @ts-ignore
import createAdmin from '../controllers/admin';

// import verifyAuth from '../middleware/verifyAuth';

const router = express.Router();

// Admin routes

router.post('/admin', createAdmin);

// router.post('/:id')

export default router;
