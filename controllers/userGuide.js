const {userGuide} = require("../models/index.js");
const {Op} = require('sequelize');

class userGuideController{
    static async getUserGuides(req, res, next){
        try{
            const { userType } = req.decodedToken;
            const userGuides = await userGuide.findAll({where:{forUserType: userType}});
            res.status(200).json({
                data: userGuides,
                msg: 'User guides retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async getUserGuidesByString(req, res, next){
        try{
            const { userType } = req.decodedToken;
            const userGuides = await userGuide.findAll({where:{forUserType: userType, content: {[Op.substring]:req.params.searchString}}});
            if(userGuides == ""){
                throw ({name: ""});
            }
            res.status(200).json({
                data: userGuides,
                msg: 'User guides retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async createUserGuide(req, res, next){
        const { id, userType } = req.decodedToken;
        if(userType.includes('user')){
            throw ({ name: "UNAUTHORIZED"});
        }
        try{
            const {
                forUserType,
                pictureUrl, 
                content
            } = req.body;

            const transaction = await sequelize.transaction();

            const newUserGuide = await userGuide.create({
                staffID: id,
                forUserType,
                pictureUrl,
                content
            },{
                transaction
            });

            transaction.commit();

            res.status(201).json({
                data: newUserGuide,
                msg: 'New user guide created successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async deleteUserGuide(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const { id, userType } = req.decodedToken;
            const blogToBeDeleted = blog.findAll({where: {id: req.params.id}});
            if(blogToBeDeleted.staffID != id || userType.includes('user')){
                throw ({ name: "UNAUTHORIZED"});
            }

            await blog.destroy({where: {id: req.params.id}}, {transaction});
            await transaction.commit();

            res.status(200).json({
                msg: 'Blog deleted successfully'
            });
        }catch(error){
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async editUserGuide(req, res, next){
        try{
            const {id, userType} = req.decodedToken;
            const userGuideToBeEdited = await userGuide.findAll({plain: true, where: {id: req.params.id}});
            
            if(userType.includes('user') || userType.includes('staff') || userGuideToBeEdited.staffID != id){
                throw ({ name: "UNAUTHORIZED"});
            }
            
            const {
                content,
                pictureUrl
            } = req.body;
            const transaction = await sequelize.transaction();
            await userGuide.update({
                content,
                pictureUrl
            }, {
                where: {id: req.params.id}
            }, {
                transaction
            });
            await transaction.commit();

            res.status(200).json({
                msg: 'User guide edited successfully'
            });
        }catch(error){
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }
}

module.exports = userGuideController;