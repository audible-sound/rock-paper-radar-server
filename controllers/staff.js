const {staff, staffProfile, sequelize} = require("../models/index.js");
const {comparePassword} = require("../helpers/encryption.js");
const {createToken} = require("../helpers/accessToken.js");

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

    static async editstaffProfile(req, res, next){
        try{
            const {id, userType} = req.decodedToken;
            const staffProfileToBeEdited = await staffProfile.findAll({plain: true, where: {staffID: id}});
            
            if(!staffProfileToBeEdited || userType.includes('user')){
                throw ({ name: "UNAUTHORIZED"});
            }
            
            const {
                profileDescription,
                pictureUrl
            } = req.body;
            const transaction = await sequelize.transaction();
            await staffProfile.update({
                profileDescription,
                pictureUrl
            }, {
                where: {staffID: id}
            }, {
                transaction
            });
            await transaction.commit();

            res.status(200).json({
                msg: 'Staff profile edited successfully'
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