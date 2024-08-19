const { User, Comment, Post, sequelize, UserProfile } = require('../models/index');
class CommentController {
    static async createComment(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { postId } = req.params;
            const { commentContent } = req.body;
            const { username } = req.decodedToken;

            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            const post = await Post.findOne({ where: { id: postId } });
            if (!post) {
                throw new Error('POST_NOT_FOUND');
            }
            const comment = await Comment.create({
                commentContent,
                postId,
                userId: actualUser.id
            }, { transaction });
            await transaction.commit();
            res.status(201).json({
                message: 'Comment created successfully',
                comment
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
    static async getCommentsForPost(req, res, next) {
        try {   
            const { postId } = req.params;
            const comments = await Comment.findAll({ where: { postId }, include: {
                model: User,
                attributes: ['username'],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl']
                }]
            } });
            res.status(200).json({
                data: comments,
                message: 'Comments fetched successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async editComment(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { commentId } = req.params;
            const { commentContent } = req.body;
            const { username } = req.decodedToken;

            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const comment = await Comment.findOne({ 
                where: { 
                    id: commentId,
                    userId: actualUser.id
                } 
            });

            if (!comment) {
                throw new Error('COMMENT_NOT_FOUND');
            }

            await comment.update({ commentContent }, { transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Comment updated successfully',
                comment
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async deleteComment(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { commentId } = req.params;
            const { username } = req.decodedToken;

            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const comment = await Comment.findOne({ 
                where: { 
                    id: commentId,
                    userId: actualUser.id
                } 
            });

            if (!comment) {
                throw new Error('COMMENT_NOT_FOUND');
            }

            await comment.destroy({ transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Comment deleted successfully'
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}

module.exports = CommentController;