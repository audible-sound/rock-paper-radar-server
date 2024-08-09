// const Staff = require('../models/staff.js');
// const models = require('../models');
const Staff = require('../models').staff;
const staffProfile = require('../models').staffProfile;

const {hashPassword, comparePassword} = require("../helpers/encryption.js");
const {createToken} = require("../helpers/accessToken.js");


class staffController{
    //req = request
    //res = response
    //next = next
    static async signIn(req, res, next){
        try{
            const {username, password} = req.body;
            const actualUser = await Staff.findOne({
                where: { username },
                include: [staffProfile]
            });
            if(!actualUser){
                throw new Error("user can't be found");
            }

            const isMatch = await comparePassword(password, actualUser.password);
            if(!isMatch){
                throw new Error("password is wrong");
            }

            const data = {
                username: actualUser.username,
                pictureUrl: actualUser.staffProfile.pictureUrl
            }

            const payload = {
                username: actualUser.username,
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
        try{
            const{
                username,
                password,
                userType,
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                pictureUrl
            } = req.body;

            const hashedPassword = await hashPassword(password);

            const createdStaff = await Staff.create({
                username,
                password: hashedPassword,
                userType,
                email,
                birthDate,
                gender,
                country,
                phoneNumber
            });

            const createdStaffProfile = await staffProfile.create({
                staffID: createdStaff.id,
                profileDescription: profileDescription,
                pictureUrl: pictureUrl
            });

            const data = {
                username: createdStaff.username,
                pictureUrl: createdStaffProfile.profilePicture
            }

            const payload = {
                username: createdStaff.username,
                date: new Date()
            }
            const accessToken = createToken(payload);

            res.status(201).json({
                message: 'Staff registered successfully',
                data,
                accessToken
            })
        }catch(error){
            next(error);
        }
    }
};

module.exports = staffController;