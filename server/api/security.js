// ADMIN RIGHTS
function isAdmin(req, res, next) {
  req.user && req.user.isAdmin ? next() : res.sendStatus(403);
}

// LOGGED IN USER AND ADMIN RIGHTS
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(403);
}

module.exports = { isAdmin, isLoggedIn };
