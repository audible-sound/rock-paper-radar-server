const { User, UserProfile, sequelize, Ban } = require('../models/index.js');
const { hashPassword, comparePassword } = require("../helpers/encryption.js");
const { createToken } = require("../helpers/accessToken.js");

class UserController {
    static async getPersonalProfile(req, res, next) {
        try {
            const { username } = req.decodedToken;
            const actualUser = await User.findOne({
                where: { username },
                include: [UserProfile]
            })
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: {
                    username: actualUser.username,
                    profilePictureUrl: actualUser.UserProfile.profilePictureUrl,
                    joinedDate: actualUser.createdAt
                }
            })
        } catch (error) {
            next(error);
        }
    }
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
                throw ({ name: "INVALID_USERNAME" });
            }
            const isMatch = await comparePassword(password, actualUser.password);
            if (!isMatch) {
                throw ({ name: "INVALID_PASSWORD" });
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
        const transaction = await sequelize.transaction();
        try {
            const {
                username,
                password,
                confirmPassword,
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                profilePictureUrl
            } = req.body;

            if (password !== confirmPassword) {
                throw ({ name: "PASSWORDS_DO_NOT_MATCH" });
            }

            const hashedPassword = await hashPassword(password);

            const createdUser = await User.create({
                username,
                password: hashedPassword,
                email,
                birthDate,
                gender,
                country,
                phoneNumber
            }, {
                transaction
            });

            const createdUserProfile = await UserProfile.create({
                userId: createdUser.id,
                profileDescription,
                profilePictureUrl,
                userId: createdUser.id
            }, {
                transaction
            });
            const createdBan = await Ban.create({
                userID: createdUser.id,
                timestampUnbanned: new Date('January 1, 1970 00:00:00')
            });

            await transaction.commit();

            const data = {
                username: createdUser.username,
                profilePictureUrl: createdUserProfile.profilePictureUrl
            };

            const payload = {
                username: createdUser.username,
                date: new Date()
            };

            const accessToken = createToken(payload);

            res.status(201).json({
                message: 'User registered successfully',
                data,
                accessToken
            })
        } catch (error) {
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

};

module.exports = UserController;