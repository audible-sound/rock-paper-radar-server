const {feedback, sequelize, User, UserProfile, staff, staffProfile} = require("../models/index.js");

class feedbackController{
    static async createFeedback(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const {
                title,
                description
            } = req.body;
            const { id, userType } = req.decodedToken;

            const createdFeedback = await feedback.create({
                userId: id,
                userType,
                feedbackTitle: title,
                feedbackDescription: description
            }, {
                transaction
            });

            await transaction.commit();

            const data = {
                feedbackId: createdFeedback.id,
                createdAt: createdFeedback.createdAt
            }

            res.status(201).json({
                message: 'Feedback saved successfully',
                data
            })
        }catch(error){
            if(error.name.includes('Sequelize')){
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async getFeedbacks(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType !== 'admin'){
                throw ({name: "UNAUTHORIZED"});
            }
            const feedbacks = await feedback.findAll();
            res.status(200).json({
                data: feedbacks,
                msg: 'Feedbacks retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async getFeedbackById(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType !== 'admin'){
                throw ({name: "UNAUTHORIZED"});
            }
            var dataUser = "";
            const feedbacks = await feedback.findAll({plain: true, where: {id: req.params.id}});
            if(feedbacks.userType.includes('user')){
                dataUser = await User.findOne({where: {id: feedbacks.userId}, include: [UserProfile]});
            }else{
                dataUser = await staff.findOne({where: {id: feedbacks.userId}, include: [staffProfile]});
            }
            const datas = {
                feedbacks,
                dataUser
            }
            res.status(200).json({
                data: datas,
                msg: 'Feedback retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async getUserDataByIdandUserType(req, res, next){
        try{
            const {userType} = req.decodedToken;
            const { reqID, reqUserType } = req.body;

            if(userType !== 'admin'){
                throw ({name: "UNAUTHORIZED"});
            }

            var data = "";
            if(reqUserType.includes('user')){
                data = await User.findOne({where: {id: reqID}, include: [UserProfile]});
            }else{
                data = await staff.findOne({where: {id: reqID}, include: [staffProfile]});
            }

            res.status(200).json({
                data,
                msg: 'Feedback retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }
}

module.exports = feedbackController;