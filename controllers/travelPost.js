const Post = require('../models/post.js');

class TravelPostController {
    static async getPosts(req, res, next) {
        try {
            const posts = await Post.findAll();
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
            const post = await Post.findById(req.params.id);
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
            const { userId, pictureUrl, postContent} = req.body;
            const newPost = await Post.create({ userId, pictureUrl, postContent });
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
            const updatedPost = await Post.update({
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