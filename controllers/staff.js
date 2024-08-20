const {staff, staffProfile, sequelize, blog} = require("../models/index.js");
const {comparePassword} = require("../helpers/encryption.js");
const {createToken} = require("../helpers/accessToken.js");
const staffprofile = require("../models/staffprofile.js");

class staffController{
    static async getPersonalProfile(req, res, next) {
        try {
            const { username } = req.decodedToken;
            const actualStaff = await staff.findOne({
                where: { username },
                include: [staffProfile]
            })
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: {
                    username: actualStaff.username,
                    profilePictureUrl: actualStaff.staffProfile.pictureUrl,
                    joinedDate: actualStaff.createdAt
                }
            })
        } catch (error) {
            next(error);
        }
    }

    static async getProfile(req, res, next) {
        try {
            const givenUsername = req.query.username;
            const actualStaff = await staff.findOne({
                where: { username: givenUsername },
                include: [staffProfile]
            })
            const blogsCount = await blog.count({where: {id: actualStaff.id}})
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: {
                    username: actualStaff.username,
                    profilePictureUrl: actualStaff.staffProfile.pictureUrl,
                    totalBlogs: blogsCount,
                    joinedDate: actualStaff.createdAt,
                    createdAt: actualStaff.createdAt,
                    birthDate: actualStaff.birthDate,
                    gender: actualStaff.gender,
                    email: actualStaff.email,
                    country: actualStaff.country,
                    phoneNumber: actualStaff.phoneNumber,
                    description: actualStaff.staffProfile.profileDescription
                }
            })
        } catch (error) {
            next(error);
        }
    }

    static async editstaffProfile(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const {id, userType} = req.decodedToken;
            const staffProfileToBeEdited = await staff.findAll({plain: true, where: {id}});
            const blogsCount = await blog.count({ where: {staffID: id}});
            if(!staffProfileToBeEdited || userType.includes('user')){
                throw ({ name: "UNAUTHORIZED"});
            }
            
            const {
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                profilePictureUrl
            } = req.body;

            await staff.update({
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
            }, {
                where: {id}
            }, {
                transaction
            });

            await staffProfile.update({
                profileDescription,
                pictureUrl: profilePictureUrl
            }, {
                where: {staffID: id}
            }, {
                transaction
            });
            await transaction.commit();

            const data = {
                username: staff.id,
                profilePictureUrl: staffProfile.pictureUrl,
                joinedDate: staff.createdAt,
                totalBlogs: blogsCount
            }

            res.status(200).json({
                msg: 'Staff profile edited successfully',
                data
            });
        }catch(error){
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async signIn(req, res, next){
        try{
            const {username, password} = req.body;
            const actualStaff = await staff.findOne({
                where: { username },
                include: [staffProfile]
            });
            if(!actualStaff){
                throw ({name: "INVALID_USERNAME"});
            }

            const isMatch = await comparePassword(password, actualStaff.password);
            if(!isMatch){
                throw ({name: "INVALID_PASSWORD"});
            }

            const data = {
                username: actualStaff.username,
                pictureUrl: actualStaff.staffProfile.pictureUrl
            }

            const payload = {
                username: actualStaff.username,
                id: actualStaff.id,
                userType: actualStaff.userType,
                date: new Date()
            }
            const accessToken = createToken(payload);

            res.status(200).json({
                message: 'Staff signed in successfully',
                data,
                accessToken
            });
        }catch(error){
            next(error);
        }
    }

};

module.exports = staffController;