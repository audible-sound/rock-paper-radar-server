const User = require('../models/user.js');
const UserProfile = require('../models/userprofile.js');
const { hashPassword, comparePassword } = require("../helpers/encryption.js");
const { createToken } = require("../helpers/accessToken.js");

class UserController {
    /*
    TO DO:
    - Error Handling
    */
    static async signIn(req, res, next) {
        try {
            const { username, password } = req.body;
            const actualUser = await User.findOne({
                where: { username },
                include: [UserProfile]
            });
            if (!actualUser) {
                throw new Error('');
            }

            const isMatch = await comparePassword(password, actualUser.password);
            if (!isMatch) {
                throw new Error('');
            }

            const data = {
                username: actualUser.username,
                profilePictureUrl: actualUser.UserProfile.profilePictureUrl
            }

            const payload = {
                username: actualUser.username,
                date: new Date()
            }
            const accessToken = createToken(payload);

            res.status(200).json({
                message: 'User signed in successfully',
                data,
                accessToken
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    TO DO:
    - Data insertion transaction
    - Password Comparison
    - Error Handling
    */
    static async registerUser(req, res, next) {
        try {
            const {
                username,
                password,
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                profilePictureUrl
            } = req.body;

            const hashedPassword = await hashPassword(password);

            const createdUser = await User.create({
                username,
                password: hashedPassword,
                email,
                birthDate,
                gender,
                country,
                phoneNumber
            });
            const createdUserProfile = await UserProfile.create({
                profileDescription,
                profilePictureUrl
            });

            const data = {
                username: createdUser.username,
                profilePictureUrl: createdUserProfile.profilePictureUrl
            }

            const payload = {
                username: createdUser.username,
                date: new Date()
            }
            const accessToken = createToken(payload);

            res.status(201).json({
                message: 'User registered successfully',
                data,
                accessToken
            })
        } catch (error) {
            next(error);
        }
    }
};

module.exports = UserController;