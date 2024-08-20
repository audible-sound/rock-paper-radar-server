const {feedback, sequelize} = require("../models/index.js");

class feedbackController{
    static async createFeedback(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const {
                feedbackContent,
                pictureUrl
            } = req.body;
            const { id, userType } = req.decodedToken;

            const createdFeedback = await feedback.create({
                userID: id,
                userType,
                feedbackContent,
                pictureUrl
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
            const feedbacks = await feedback.findAll({where: {id: req.params.id}});
            res.status(200).json({
                data: feedbacks,
                msg: 'Feedback retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }
}

module.exports = feedbackController;