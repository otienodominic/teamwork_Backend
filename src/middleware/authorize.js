function authUser(req, res, next) {
  if (req.user == null) {
    res.status(400).json({
      status: 'error',
      Error: 'You need to sign in!',
    });
  }
  // next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401).json({
        status: 'error',
        Error: 'Not Allowed!',
      });
    }
    // next();
  };
}
export default { authUser, authRole };
