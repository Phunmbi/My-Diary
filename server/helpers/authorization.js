// This tutorial helped explain and implement how to verify JWT tokens and authorize paths
// https://www.youtube.com/watch?v=8Ip0pcwbWYM&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=13&pbjreload=10

import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(404).json({ message: 'Unauthorized' });
      } else {
        req.userData = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

export { authorization };