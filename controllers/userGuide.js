const {userGuide} = require("../models/index.js");
const {Op} = require('sequelize');

class userGuideController{
    static async getUserGuides(req, res, next){
        try{
            const userGuides = await userGuide.findAll({where:{forUserType: 'staff'}});
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
            const userGuides = await userGuide.findAll({where:{forUserType: 'staff', content: {[Op.substring]:req.params.searchString}}});
            if(userGuides == ""){
                throw new Error('User guide not found');
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
        try{
            const {
                staffID, 
                forUserType,
                pictureUrl, 
                content
            } = req.body;

            const newUserGuide = await userGuide.create({
                staffID,
                forUserType,
                pictureUrl,
                content
            });

            res.status(201).json({
                data: newUserGuide,
                msg: 'New user guide created successfully'
            });
        }catch(error){
            next(error);
        }
    }
}

module.exports = userGuideController;