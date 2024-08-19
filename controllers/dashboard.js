const {User, sequelize, Post} = require("../models/index.js");
const {where, Op} = require("sequelize");

class dashboardController{
    static async getTotalCreatedUserAccount(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }

            const TotalCreatedUserAccount = await User.findAll();

            res.status(200).json({
                data: TotalCreatedUserAccount,
                msg: 'Total Created User Account retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async getMonthlyCreatedUserAccount(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth()+1;
            const currentYear = currentDate.getFullYear();
            
            const MonthlyCreatedUserAccount = await User.findAll({
                where: {
                    createdAt: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "createdAt"')), currentMonth),
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "createdAt"')), currentYear)
                        ]
                    }
                }
            });

            res.status(200).json({
                data: MonthlyCreatedUserAccount,
                msg: 'Monthly Created User Account retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async getYearlyCreatedUserAccount(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            
            const YearlyCreatedUserAccount = await User.findAll({
                where: {
                    createdAt: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "createdAt"')), currentYear)
                        ]
                    }
                }
            });

            res.status(200).json({
                data: YearlyCreatedUserAccount,
                msg: 'Yearly Created User Account retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }
    static async getMonthlyCreatedPost(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth()+1;
            const currentYear = currentDate.getFullYear();
            
            const MonthlyCreatedUserAccount = await Post.findAll({
                where: {
                    createdAt: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "createdAt"')), currentMonth),
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "createdAt"')), currentYear)
                        ]
                    }
                }
            });

            res.status(200).json({
                data: MonthlyCreatedUserAccount,
                msg: 'Monthly Created User Account retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async getYearlyCreatedPost(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType != 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            
            const YearlyCreatedUserAccount = await Post.findAll({
                where: {
                    createdAt: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "createdAt"')), currentYear)
                        ]
                    }
                }
            });

            res.status(200).json({
                data: YearlyCreatedUserAccount,
                msg: 'Yearly Created User Account retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

}

module.exports = dashboardController;