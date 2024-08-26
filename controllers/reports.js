const {userReport, userBans} = require("../models/index.js");
const {Op} = require('sequelize');

class reportController{
    static async getUserReports(req, res, next){
        try{
            const { userType } = req.decodedToken;
            if(userType.includes('user')){
                throw ({ name: "UNAUTHORIZED"});
            }
            const userReports = await userReport.findAll();
            res.status(200).json({
                data: userReports,
                msg: 'User reports retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async getUserReportsByID(req, res, next){
        try{
            const { userType } = req.decodedToken;
            if(userType.includes('user')){
                throw ({ name: "UNAUTHORIZED"});
            }
            const userReports = await userReport.findAll({where:{ id: req.params.id}});

            res.status(200).json({
                data: userReports,
                msg: 'User guides retrieved successfully'
            });
        }catch(error){
            next(error);
        }
    }

    static async createUserReport(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const {
                userID,
                reportContent
            } = req.body;

            const newUserReport = await userReport.create({
                userID,
                reportState: 'unverified',
                reportContent
            }, {
                transaction
            });
            transaction.commit();

            res.status(201).json({
                data: newUserReport,
                msg: 'New user report created successfully'
            });
        }catch(error){
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async editUserReportState(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType.includes('admin')){
                throw ({ name: "UNAUTHORIZED"});
            }

            const {
                reportState,
                timestampUnbanned
            } = req.body;

            const transaction = await sequelize.transaction();

            await userReport.update({
                reportState
            }, {
                where: {id: req.params.id}
            }, {
                transaction
            });
            
            if(reportState == 'banned' && timestampUnbanned == ''){
                throw ({name: "MISSING_INPUT"});
            }
            if(reportState == 'banned'){
                const userToBeBanned = await userReport.findAll({plain: true, where: {id: req.params.id}})
                await userBans.create({
                    userID: userToBeBanned.userID,
                    reportID: userToBeBanned.id,
                    timestampUnbanned
                }, {
                    transaction
                });
            }

            await transaction.commit();

            res.status(200).json({
                msg: 'User report edited successfully'
            });
        }catch(error){
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }
}

module.exports = reportController;