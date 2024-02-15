const jwt = require('jsonwebtoken');

export const isAuth = (req: any, res: any, next: any) => {
    const { authorization } = req.headers;
    const token = authorization?.slice(7, authorization.length);
    if (token) {
        jwt.verify(token, 'your-secret-key', (err: any, user: any) => {
            if (err) {
                res.status(401).send({ message: 'Please login' });
            } else {
                req.user = user.user;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Please login' });
    }
};
