const {feedback, sequelize, User, UserProfile, staff, staffProfile, FeedbackReply} = require("../models/index.js");

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
                status: 'unread',
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
            const feedbacks = await feedback.findOne({where: {id: req.params.id}});
            const userId = feedbacks.userID;
            const user = await User.findOne({where: {id: userId}});
            feedbacks.username = user.username;
            res.status(200).json({
                data: feedbacks,
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

            let data = "";
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

    static async replyToFeedback(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id, userType } = req.decodedToken;
            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const { feedbackId, replyContent } = req.body;

            const existingFeedback = await feedback.findByPk(feedbackId);
            if (!existingFeedback) {
                throw ({ name: "FEEDBACK_NOT_FOUND" });
            }

            const reply = await FeedbackReply.create({
                feedbackId,
                adminId: id,
                replyContent
            }, { transaction });

            await transaction.commit();

            res.status(201).json({
                message: 'Reply sent successfully',
                data: {
                    replyId: reply.id,
                    createdAt: reply.createdAt
                }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async getFeedbackWithReplies(req, res, next) {
        try {
            const { id } = req.params;
            const { userType } = req.decodedToken;

            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const feedbackWithReplies = await feedback.findOne({
                where: { id },
                include: [
                    {
                        model: FeedbackReply,
                        include: [
                            {
                                model: staff,
                                attributes: ['username'],
                                include: [
                                    {
                                        model: staffProfile,
                                        attributes: ['pictureUrl']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (!feedbackWithReplies) {
                throw ({ name: "FEEDBACK_NOT_FOUND" });
            }

            res.status(200).json({
                data: feedbackWithReplies,
                message: 'Feedback and replies retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateFeedbackStatus(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { status } = req.body;
            const { userType } = req.decodedToken;

            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const existingFeedback = await feedback.findByPk(id);
            if (!existingFeedback) {
                throw ({ name: "FEEDBACK_NOT_FOUND" });
            }

            await feedback.update({ status }, {
                where: { id },
                transaction
            });

            await transaction.commit();

            res.status(200).json({
                message: 'Feedback status updated successfully',
                data: {
                    id,
                    status
                }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async deleteFeedbackReply(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { userType } = req.decodedToken;

            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const reply = await FeedbackReply.findByPk(id);
            if (!reply) {
                throw ({ name: "REPLY_NOT_FOUND" });
            }

            await reply.destroy({ transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Feedback reply deleted successfully',
                deletedReplyId: id
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async editFeedbackReply(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { replyContent } = req.body;
            const { userType } = req.decodedToken;

            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const reply = await FeedbackReply.findByPk(id);
            if (!reply) {
                throw ({ name: "REPLY_NOT_FOUND" });
            }

            await reply.update({ replyContent }, { transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Feedback reply updated successfully',
                data: {
                    replyId: reply.id,
                    updatedAt: reply.updatedAt
                }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}

module.exports = feedbackController;