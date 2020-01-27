const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        req.status(400).send('Invalid Token')
    }
}