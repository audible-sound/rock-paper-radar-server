const {userReport, userBans, sequelize, User} = require("../models/index.js");

class reportController{
    static async getUserReports(req, res, next){
        try{
            const { userType } = req.decodedToken;
            if(userType.includes('user')){
                throw ({ name: "UNAUTHORIZED"});
            }
            const userReports = await userReport.findAll({where:{forUserType: userType}});
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
                username,
                reportContent
            } = req.body;

            const actualUser = await User.findOne({where: {username}})

            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const newUserReport = await userReport.create({
                userID: actualUser.id,
                reporterID: req.decodedToken.id, // Assuming the reporter's ID is in the decoded token
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
            if(userType.includes('user')){
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