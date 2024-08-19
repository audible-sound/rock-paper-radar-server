const { User, UserProfile, sequelize, Ban, Post } = require('../models/index.js');
const { hashPassword, comparePassword } = require("../helpers/encryption.js");
const { createToken } = require("../helpers/accessToken.js");

class UserController {
    static async getPersonalProfile(req, res, next) {
        try {
            const { username } = req.decodedToken;
            const actualUser = await User.findOne({
                where: { username },
                include: [UserProfile]
            });
            const totalPosts = await Post.count({
                where: { userId: actualUser.id }
            });
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: {
                    username: actualUser.username,
                    profilePictureUrl: actualUser.UserProfile.profilePictureUrl,
                    joinedDate: actualUser.createdAt,
                    totalPosts
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserProfile(req, res, next) {
        try {
            const { username } = req.query;
            const actualUser = await User.findOne({
                where: { username },
                include: [UserProfile]
            });
            const totalPosts = await Post.count({
                where: { userId: actualUser.id }
            });
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: {
                    username: actualUser.username,
                    profilePictureUrl: actualUser.UserProfile.profilePictureUrl,
                    joinedDate: new Date(actualUser.createdAt),
                    totalPosts,
                    birthDate: new Date(actualUser.birthDate),
                    gender: actualUser.gender,
                    country: actualUser.country,
                    phoneNumber: actualUser.phoneNumber,
                    profileDescription: actualUser.UserProfile.profileDescription,
                    email: actualUser.email
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async signIn(req, res, next) {
        try {
            const { username, password } = req.body;
            const actualUser = await User.findOne({
                where: { username },
                include: [UserProfile, Ban]
            });
            if (!actualUser) {
                throw ({ name: "INVALID_USERNAME" });
            }
            const isMatch = await comparePassword(password, actualUser.password);
            if (!isMatch) {
                throw ({ name: "INVALID_PASSWORD" });
            }
            if(actualUser.Ban.timestampUnbanned > new Date()){
                throw ({ name: "USER_BANNED" });
            }
            const data = {
                username: actualUser.username,
                profilePictureUrl: actualUser.UserProfile.profilePictureUrl
            }
            const payload = {
                username: createdUser.username,
                id: createdUser.id,
                userType: 'user',
                date: new Date()
            };
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

            // const createdBan = await Ban.create({
            //     userID: createdUser.id,
            //     timestampUnbanned: new Date('January 1, 1970 00:00:00')
            // });

            await transaction.commit();

            const data = {
                username: createdUser.username,
                profilePictureUrl: createdUserProfile.profilePictureUrl
            };

            const payload = {
                username: createdUser.username,
                id: createdUser.id,
                userType: 'user',
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
    static async updateUserProfile(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { username } = req.decodedToken;
            const {
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                profilePictureUrl
            } = req.body;
    
            const actualUser = await User.findOne({
                where: { username },
                include: [UserProfile]
            });
    
            if (!actualUser) {
                throw ({ name: "USER_NOT_FOUND" });
            }
    
            // Update User model
            await actualUser.update({
                email,
                birthDate,
                gender,
                country,
                phoneNumber
            }, { transaction });
    
            // Update UserProfile model
            await actualUser.UserProfile.update({
                profileDescription,
                profilePictureUrl
            }, { transaction });
    
            await transaction.commit();
    
            res.status(200).json({
                message: 'User profile updated successfully',
                data: {
                    profilePictureUrl: actualUser.UserProfile.profilePictureUrl,
                }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
};

module.exports = UserController;