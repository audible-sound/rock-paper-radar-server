const { blog, staff, sequelize } = require("../models/index.js");

class blogController {
    static async getBlogs(req, res, next) {
        try {
            const blogs = await blog.findAll({
                include: [{
                    model: staff,
                    attributes: ['username']
                }]
            });
            res.status(200).json({
                data: blogs,
                msg: 'Blogs retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getBlogsByUsername(req, res, next) {
        try {
            const { username } = req.params;
            const foundStaff = await staff.findOne({ where: { username } });
            if (!foundStaff) {
                throw { name: "NOT_FOUND" };
            }

            const blogs = await blog.findAll({
                where: { staffID: foundStaff.id },
                include: [{
                    model: staff,
                    attributes: ['username']
                }]
            });

            res.status(200).json({
                data: blogs,
                msg: 'Blogs retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getMyBlogs(req, res, next) {
        const { id } = req.decodedToken
        try {
            const blogs = await blog.findAll({
                where: { staffID: id },
                include: [{
                    model: staff,
                    attributes: ['username']
                }]
            });
            res.status(200).json({
                data: blogs,
                msg: 'Blogs retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getBlogsById(req, res, next) {
        try {
            const blogs = await blog.findAll({
                where: { id: req.params.id },
                include: [{
                    model: staff,
                    attributes: ['username']
                }]
            });
            if (blogs.length === 0) {
                throw new Error('Blog not found');
            }
            res.status(200).json({
                data: blogs,
                msg: 'Post retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async createBlog(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const {
                blogTitle,
                blogPicture,
                blogContent
            } = req.body;
            const { id } = req.decodedToken;

            const newBlog = await blog.create({
                staffID: id,
                blogTitle,
                blogPicture,
                blogContent,
                blogLikes: 0
            }, {
                transaction
            });

            await transaction.commit();

            res.status(201).json({
                data: newBlog,
                msg: 'Blog created successfully'
            });
        } catch (error) {
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async likeBlog(req, res, next) {
        // TODO - add new table to store who liked what
        // can't use array in staff table, audy/havyn need for recommend system
        try {
            const { id } = req.params;
            const updatedPost = await blog.update({
                where: {
                    id
                }
            });

            res.status(200).json({
                data: updatedPost,
                msg: 'Blog liked successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteBlog(req, res, next) {
        try {
            const { id, userType } = req.decodedToken;
            const blogToBeDeleted = await blog.findAll({ plain: true, where: { id: req.params.id } });

            if (blogToBeDeleted.staffID !== id || userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }

            const transaction = await sequelize.transaction();
            await blog.destroy({ where: { id: req.params.id } }, { transaction });
            await transaction.commit();

            res.status(200).json({
                msg: 'Blog deleted successfully'
            });
        } catch (error) {
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async editBlog(req, res, next) {
        try {
            const { id, userType } = req.decodedToken;
            const blogToBeEdited = await blog.findAll({ plain: true, where: { id: req.params.id } });

            if (blogToBeEdited.staffID !== id || userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }

            const {
                blogTitle,
                blogPicture,
                blogContent,
            } = req.body;
            const transaction = await sequelize.transaction();
            await blog.update({
                blogTitle,
                blogPicture,
                blogContent
            }, {
                where: { id: req.params.id }
            }, {
                transaction
            });
            await transaction.commit();

            res.status(200).json({
                msg: 'Blog edited successfully'
            });
        } catch (error) {
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }
}

module.exports = blogController;