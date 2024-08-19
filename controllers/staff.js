const {User, staff, staffProfile, sequelize, ReportPost, BannedPost, ReportComment, BannedComment} = require("../models/index.js");
const {hashPassword, comparePassword} = require("../helpers/encryption.js");
const {createToken} = require("../helpers/accessToken.js");
const {where, Op} = require("sequelize");

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

    static async registerStaff(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const{
                username,
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

    static async getReportPost(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }
            
            const ReportPost = await ReportPost.findAll();

            res.status(200).json({
                data: ReportPost,
                msg: 'User Report retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }
    
    static async createBannedPost(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const {
                reportId,
            } = req.body;

            const createdBannedPost = await BannedPost.create({
                reportId,
            }, { transaction});
            await transaction.commit();

            const data = {
                id: createdBannedPost.id,
                date: createdBannedPost.createdAt                
            }

            res.status(201).json({
                msg: 'Banned post created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async getBannedPost(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            
            const createdBannedPost = await BannedPost.findAll();

            res.status(200).json({
                data: createdBannedPost,
                msg: 'Banned Post retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async getReportComment(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }
            
            const getReportComment = await ReportComment.findAll();

            res.status(200).json({
                data: getReportComment,
                msg: 'User Report retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async createBannedComment(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const {
                reportId,
            } = req.body;

            const createdBannedComment = await BannedComment.create({
                reportId,
            }, { transaction});
            await transaction.commit();

            const data = {
                id: createdBannedComment.id,
                date: createdBannedComment.createdAt                
            }

            res.status(201).json({
                msg: 'Banned comment created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async getBannedComment(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            
            const createdBannedComment = await BannedComment.findAll();

            res.status(200).json({
                data: createdBannedComment,
                msg: 'Banned Comment retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }
};

module.exports = staffController;