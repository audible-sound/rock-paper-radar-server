const {BugReport, sequelize} = require("../models/index.js");

class bugReportController{
    static async createBugReport(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const {
                bugContent,
                pictureUrl
            } = req.body;
            const { id, userType } = req.decodedToken;

            const createdBugReport = await BugReport.create({
                userID: id,
                userType,
                bugContent,
                pictureUrl,
                bugState: 'Unread'
            }, {
                transaction
            });

            await transaction.commit();

            const data = {
                bugReportId: createdBugReport.id,
                createdAt: createdBugReport.createdAt
            }

            res.status(201).json({
                message: 'Bug report saved successfully',
                data
            })
        }catch(error){
            if(error.name.includes('Sequelize')){
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async getBugReports(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(!userType.includes('admin')){
                throw ({name: "UNAUTHORIZED"});
            }
            const BugReports = await BugReport.findAll();
            res.status(200).json({
                data: BugReports,
                msg: 'Bug Reports retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async getBugReportById(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(!userType.includes('admin')){
                throw ({name: "UNAUTHORIZED"});
            }
            const BugReports = await BugReport.findAll({where: {id: req.params.id}});
            res.status(200).json({
                data: BugReports,
                msg: 'Bug Report retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }
}

module.exports = bugReportController;