/* haf to import dotenv or SALT returns undefined!! */
const dotenv = require('dotenv');
dotenv.config();
const { SALT } = process.env;
const jwt = require('jsonwebtoken');

const verifyToken = () => async (req, res, next) => {
  try {
    console.log('middleware req.body', req.body)
    const userToken = req.header("Authorization").replace("Bearer ", "");

    /* 
    1. if verified, function below will return e payload, otherwise it will throw an error
    2. not bothering to get hold of the payload since not using it here
    */
    jwt.verify(userToken, SALT);

    next();
  } catch (err) {
    err.msg = "Not verified to access this page!"
    return res.status(403).json({ err });
  }
};

module.exports = verifyToken
