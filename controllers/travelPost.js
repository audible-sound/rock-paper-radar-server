const { Posts, User } = require('../models/index.js');

class TravelPostController {
    static async getPosts(req, res, next) {
        try {
            const posts = await Posts.findAll();
            res.status(200).json({
                data: posts,
                msg: 'Posts retrived successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPostById(req, res, next) {
        try {
            const post = await Posts.findById(req.params.id);
            if (!post) {
                throw new Error('Post not found');
            }
            res.status(200).json({
                data: post,
                msg: 'Post retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async createPost(req, res, next) {
        try {
            const { username } = req.decodedToken;
            const { pictureUrl, postContent} = req.body;
            const actualUser = await User.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }
            const userId = actualUser.id;
            const newPost = await Posts.create({ userId, pictureUrl, postContent });
            res.status(201).json({
                data: newPost,
                msg: 'Post created successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async likePost(req, res, next) {
        try {
            const { id } = req.params;
            const updatedPost = await Posts.update({
                where: {
                    id
                }
            })
            res.status(200).json({
                data: updatedPost,
                msg: 'Post liked successfully'
            });        
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TravelPostController;