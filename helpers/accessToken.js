const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

const verifyToken = (token) => {
    // return jwt.verify(token, process.env.JWT_SECRET);
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    createToken,
    verifyToken
};