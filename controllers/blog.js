const {blog} = require("../models/index.js");

class blogController{
    static async getBlogs(req, res, next){
        try{
            const blogs = await blog.findAll();
            res.status(200).json({
                data: blogs,
                msg: 'Blogs retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async getBlogsById(req, res, next){
        try{
            const blogs = await blog.findAll({where: {id: req.params.id}});
            if(blogs == ""){
                throw new Error('Blog not found');
            }
            res.status(200).json({
                data: blogs,
                msg: 'Post retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async createBlog(req, res, next){
        try{
            const {
                staffID, 
                blogPicture, 
                blogContent
            } = req.body;

            const newBlog = await blog.create({
                staffID,
                blogPicture,
                blogContent,
                blogLikes: 0
            });

            res.status(201).json({
                data: newBlog,
                msg: 'Blog created successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async likeBlog(req, res, next){
        // TODO - add new table to store who liked what
        // can't use array in staff table, audy/havyn need for recommend system
        try{
            const {id} = req.params;
            const updatedPost = await blog.update({
                where: {
                    id
                }
            });

            res.status(200).json({
                data: updatedPost,
                msg: 'Blog liked successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async deleteBlog(req, res, next){
        try{
            const {id, staffID} = req.params;
            blogToBeDeleted = blog.findAll({where: {staffID, id}});
            
            res.status(200).json({
                data: blogToBeDeleted,
                msg: 'Blog deleted successfully'
            });
        }catch(error){
            console.log(error);
            next(error);
        }
    }
}

module.exports = blogController;