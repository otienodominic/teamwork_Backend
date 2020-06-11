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

// // Create privileges
// roles.createNewPrivileges(['/create-user', 'POST'], 'creates new user', true);
// roles.createNewPrivileges(['/login', 'GET'], 'This lets user login', true);
// roles.createNewPrivileges(['/gifs', 'POST'], 'This posts gifs', true);
// roles.createNewPrivileges(['/gifs', 'GET'], 'This gets gifs', true);
// roles.createNewPrivileges(['/gifs', 'DELETE'], 'This deletes gifs', true);
// roles.createNewPrivileges(['/article', 'POST'], 'This posts article', true);
// roles.createNewPrivileges(['/article', 'PUT'], 'This edits article', true);
// roles.createNewPrivileges(['/article', 'DELETE'], 'This delets article', true);
// roles.createNewPrivileges(['/article', 'GET'], 'This gets article', true);
// roles.createNewPrivileges(['/article:id', 'GET'], 'This gets article', true);
// roles.createNewPrivileges(['/comments', 'POST'], 'This posts comment', true);
// roles.createNewPrivileges(['/comment', 'DELETE'], 'Deletes a comment', true);

// Users routes
router.get('/login', signIn);
router.post('/create-user', verifyJWTToken, admin, createUser);

// article routes
router.post('/article', verifyJWTToken, createArticle);
router.put('/article/:id', verifyJWTToken, updateArticle);
router.get('/article', verifyJWTToken, getAllArticles);
router.get('/article/:id', verifyJWTToken, getOneArticle);
router.delete('/article/:id', verifyJWTToken, deleteArticle);

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
