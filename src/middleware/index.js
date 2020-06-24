import jwt from 'jsonwebtoken';
import config from '../config';

const { secret } = config;
async function verifyJWTToken(req, res, next) {
  /*
   * Normally JWTs are specified as Bearer Tokens.
   * Authorization Header will have something like 'Bearer <token>'
   */
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const token = header.slice(7, header.length);
    try {
      const userInfo = jwt.verify(token, secret);
      req.user = userInfo;
      // console.log(req.user.jobrole);
      next();
    } catch (error) {
      next(new Error('Authentication Failed'));
    }
  } else {
    next(
      res.status(403).json({
        status: 'error',
        Error: 'You must be logged in!',
      }),
    );
  }
}

function admin(req, res, next) {
  if (req.user.jobrole !== 'Admin') {
    res.status(403).json({
      status: 'error',
      Error: 'You are not Authorised!',
    });
  }
  next();
}

export default { verifyJWTToken, admin };
