const {staff, staffProfile, sequelize} = require("../models/index.js");
const {hashPassword, comparePassword} = require("../helpers/encryption.js");
const {createToken} = require("../helpers/accessToken.js");

class adminController{
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
                pictureUrl: actualStaff.staffProfile.pictureUrl,
                userType: actualStaff.userType
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
    static async registerStaff(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const{
                username,
                fullName,
                password,
                confirmPassword,
                userType,
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                pictureUrl
            } = req.body;

            if(password != confirmPassword){
                throw({name: "PASSWORDS_DO_NOT_MATCH"});
            }

            const hashedPassword = await hashPassword(password);

            const createdStaff = await staff.create({
                username,
                fullName,
                password: hashedPassword,
                userType,
                email,
                birthDate,
                gender,
                country,
                phoneNumber
            }, {
                transaction
            });

            const createdStaffProfile = await staffProfile.create({
                id: createdStaff.id,
                staffID: createdStaff.id,
                profileDescription: profileDescription,
                pictureUrl: pictureUrl
            }, {
                transaction
            });

            await transaction.commit();

            const data = {
                username: createdStaff.username,
                pictureUrl: createdStaffProfile.profilePicture
            }

            const payload = {
                username: createdStaff.username,
                id: createdStaff.id,
                userType: createdStaff.userType,
                date: new Date()
            }
            const accessToken = createToken(payload);

            res.status(201).json({
                message: 'Staff registered successfully',
                data,
                accessToken
            })
        }catch(error){
            if(error.name.includes('Sequelize')){
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async getEmployees(req, res, next){
        try{
            const { userType } = req.decodedToken;
            if(userType.includes('user') || userType.includes('staff')){
                throw ({name: "UNAUTHROIZED"})
            }

            const staffs = await staff.findAll({
                include: [staffProfile]
            });

            res.status(200).json({
                data: staffs,
                msg: 'Staff list retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

};

module.exports = adminController;