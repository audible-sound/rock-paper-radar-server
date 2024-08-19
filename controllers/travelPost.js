const { Post, User, UserLike, PostTag, UserProfile, Comment, ReportPost, ReportComment, sequelize } = require('../models/index.js');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

class TravelPostController {
    static async getPosts(req, res, next) {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                        include: [{
                            model: UserProfile,
                            attributes: ['profilePictureUrl']
                        }]
                    },
                    {
                        model: PostTag,
                        attributes: ['name']
                    }
                ]
            });
            res.status(200).json({
                data: posts,
                msg: 'Posts retrived successfully'
            });
        } catch (error) {
            next(error);                                                                                                                                                
        }
    }

    static async getUserPosts(req, res, next) {
        try {
            const { username } = req.query;
            const actualUser = await User.findOne({ where: { username }, include: [UserProfile] });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            const userId = actualUser.id;
            const posts = await Post.findAll({
                where: { userId },
                include: {
                    model: PostTag,
                    where: {
                        postId: { [op.col]: 'Post.id' }
                    }
                }
            });
            res.status(200).json({
                data: {
                    posts,
                    username: actualUser.username,
                    profilePictureUrl: actualUser.UserProfile.profilePictureUrl,
                },
                msg: 'Posts retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPostById(req, res, next) {
        try {
            const post = await Post.findOne({
                where: { id: parseInt(req.query.postId) },
                include: [
                    {
                        model: PostTag,
                        where: {
                            postId: { [op.col]: 'Post.id' }
                        }
                    }
                ]
            });
            if (!post) {
                throw new Error('Post not found');
            }
            const author = await User.findOne({ where: { id: post.userId }, include: [UserProfile] });
            res.status(200).json({
                data: {
                    post,
                    authorDetails: {
                        profilePictureUrl: author.UserProfile.profilePictureUrl,
                        username: author.username,
                    }
                },
                msg: 'Post retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async createPost(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { username } = req.decodedToken;
            const {
                pictureUrl,
                postTitle,
                postLocation,
                categories,
                postDescription
            } = req.body;
            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            const userId = actualUser.id;
            const createdPost = await Post.create({
                userId,
                postLikes: 0,
                pictureUrl,
                postTitle,
                postContent: postDescription,
                location: postLocation
            }, { transaction });
            for (let i = 0; i < categories.length; i++) {
                await PostTag.create({
                    postId: createdPost.id,
                    name: categories[i]
                }, { transaction });
            }
            await transaction.commit();
            res.status(201).json({
                msg: 'Post created successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async likePost(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { username } = req.decodedToken;
            const { id } = req.params;
            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            const userId = actualUser.id;
            const likeExists = await UserLike.findOne({
                where: {
                    userId,
                    postId: id
                }
            });
            if (likeExists) {
                await UserLike.destroy({
                    where: {
                        userId,
                        postId: id
                    }
                }, { transaction });

                const updatedPost = await Post.decrement('postLikes', {
                    by: 1,
                    where: { id }
                }, { transaction });

                await transaction.commit();

                res.status(200).json({
                    data: updatedPost,
                    msg: 'Post unliked successfully'
                });
            } else {
                await UserLike.create({
                    userId,
                    postId: id
                }, { transaction });
                const updatedPost = await Post.increment('postLikes', {
                    by: 1,
                    where: {
                        id
                    }
                }, { transaction });
                await transaction.commit();
                res.status(201).json({
                    data: updatedPost,
                    msg: 'Post liked successfully'
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async checkUserLikedPost(req, res, next) {
        try {
            const { username } = req.decodedToken;
            const { postId } = req.params;

            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const userId = actualUser.id;
            const likeExists = await UserLike.findOne({
                where: {
                    userId,
                    postId
                }
            });

            res.status(200).json({
                liked: (likeExists ? true : false),
                msg: 'User like status retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { username } = req.decodedToken;

            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const post = await Post.findOne({ where: { id, userId: actualUser.id } });
            if (!post) {
                throw new Error('POST_NOT_FOUND');
            }

            await PostTag.destroy({ where: { postId: id }, transaction });
            await UserLike.destroy({ where: { postId: id }, transaction });
            await Comment.destroy({ where: { postId: id }, transaction });
            await Post.destroy({ where: { id }, transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Post deleted successfully'
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
    static async editPost(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { username } = req.decodedToken;
            const {
                pictureUrl,
                postTitle,
                postLocation,
                categories,
                postDescription
              
            const post = await Post.findOne({ where: { id, userId: actualUser.id } });
            if (!post) {
                throw new Error('POST_NOT_FOUND');
            }

            await PostTag.destroy({ where: { postId: post.id }, transaction });
            await post.update({
                pictureUrl,
                postTitle,
                postContent: postDescription,
                location: postLocation
            }, { transaction });


            for (let i = 0; i < categories.length; i++) {
                await PostTag.create({
                    postId: id,
                    name: categories[i]
                }, { transaction });
            }

            await transaction.commit();

            res.status(200).json({
                message: 'Post updated successfully'
            });
        } catch (error) {
            await transaction.rollback();}
          
    static async createReportPost(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { username } = req.decodedToken;
            const {
                postId,
                reportContent,
            } = req.body;

            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            const userId = actualUser.id;
            const createdReportPost = await ReportPost.create({
                userId,
                postId,
                reportState: 'unverified',
                reportContent,
            }, { transaction });
            await transaction.commit();

            const data = {
                id: createdReportPost.id,
                date: createdReportPost.createdAt                
            }

            res.status(201).json({
                msg: 'Report post created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async createReportComment(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { username } = req.decodedToken;
            const {
                commentId,
                reportContent,
            } = req.body;

            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const userId = actualUser.id;
            const createdReportComment = await ReportComment.create({
                userId,
                commentId,
                reportState: 'unverified',
                reportContent,
            }, { transaction });
            await transaction.commit();

            const data = {
                id: createdReportComment.id,
                date: createdReportComment.createdAt                
            }

            res.status(201).json({
                msg: 'Report comment created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TravelPostController;