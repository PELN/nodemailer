const jwt = require('jsonwebtoken');

 const withAuth = function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Access Denied, no token. Please login');
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if(err) {
                res.status(401).send('Unauthorized: invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}

module.exports = withAuth;
