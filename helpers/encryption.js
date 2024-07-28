const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.hashPassword(saltRounds);
        const hashedPassword = await bcrypt.hashPassword(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

async function comparePassword(password, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    hashPassword,
    comparePassword
};