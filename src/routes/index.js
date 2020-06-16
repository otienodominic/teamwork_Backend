import express from 'express';
import jwtLogin from 'jwt-login';
import middleware from '../middleware';
import controllers from '../controllers';
// import articleCtrl from '../controllers/article';

const router = express.Router();
const { createUser, signIn } = controllers.users;
const {
  createArticle,
  updateArticle,
  getAllArticles,
  getOneArticle,
  deleteArticle,
} = controllers.articles;
const { verifyJWTToken, admin } = middleware;
const {
  createComment,
  editComment,
  getAllComments,
  deleteComment,
} = controllers.comments;

// Users routes
router.get('/login', signIn);
router.post('/create-user', verifyJWTToken, admin, createUser);

// article routes
router.post('/article', verifyJWTToken, createArticle);
router.put('/article/:id', verifyJWTToken, updateArticle);
router.get('/article', verifyJWTToken, getAllArticles);
router.get('/article/:id', verifyJWTToken, getOneArticle);
router.delete('/article/:id', verifyJWTToken, deleteArticle);

// comment routes
router.post('/article/:id/comment', verifyJWTToken, createComment);
router.put('/article/:id/comment/:id', verifyJWTToken, editComment);
router.get('/article/:id/comment', verifyJWTToken, getAllComments);
router.delete('/article/:id/comment/:id', verifyJWTToken, deleteComment);

router.get('/dashboard', verifyJWTToken, admin, (req, res) => {
  res.json({ message: 'Welcome to the Home Page' });
});
router.get('/employee', verifyJWTToken, (req, res) => {
  res.json({ message: 'Welcome to Employee Dashboard' });
});
router.get('/admin', verifyJWTToken, (req, res) => {
  res.json({ message: 'Welcome to the Admin Page' });
});
router.get('/logout', (req, res) => {
  jwtLogin.signout(req, res, false);
  res.json({ message: 'You have logged out!' });
});

// testing everything

export default router;
