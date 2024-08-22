const {userGuide, Sequelize, sequelize} = require("../models/index.js");
const {Op} = require('sequelize');

class userGuideController{
    static async getUserGuides(req, res, next){
        try{
            const userGuides = await userGuide.findAll();
            res.status(200).json({
                data: userGuides,
                msg: 'User guides retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async getUserGuideEditData(req, res, next){
        try{
            const { userType } = req.decodedToken;
            const id = req.params.id;

            if(!userType.includes('admin')){
                throw {name: "UNAUTHORIZED"}
            }

            const userGuideData = await userGuide.findAll({
                where:{id},
            });

            res.status(200).json({
                data: userGuideData,
                msg: 'User guides edit data retrieved successfully'
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
                title,
                forUserType,
                content,
                section
            } = req.body;

            const transaction = await sequelize.transaction();

            const newUserGuide = await userGuide.create({
                staffID: id,
                forUserType,
                title,
                section,
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
            const { userType } = req.decodedToken;
            if(!userType.includes('admin')){
                throw ({ name: "UNAUTHORIZED"});
            }

            await userGuide.destroy({where: {id: req.params.id}}, {transaction});
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
        const transaction = await sequelize.transaction();
        try{
            const {userType} = req.decodedToken;
            const {
                title,
                forUserType,
                content,
                section
            } = req.body;
            
            if(!userType.includes('admin')){ 
                throw ({ name: "UNAUTHORIZED"});
            }
            
            const userGuideToBeEdited = await userGuide.findOne({where: {id: req.params.id}});
            
            await userGuideToBeEdited.update({
                title,
                forUserType,
                content,
                section
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

    static async getUserGuideSections(req, res, next){
        try{
            const sections = await userGuide.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('section')), 'section']
                ]
            });

            res.status(200).json({
                data: sections,
                msg: 'Sections list retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }
}

module.exports = userGuideController;