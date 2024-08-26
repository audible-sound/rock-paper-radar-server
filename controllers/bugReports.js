const {BugReport, sequelize, User} = require("../models/index.js");

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
            const BugReports = await BugReport.findOne({where: {id: req.params.id}});
            const userId = BugReports.userID;
            const user = await User.findOne({where: {id: userId}});
            BugReports.username = user.username;
            res.status(200).json({
                data: BugReports,
                msg: 'Bug Report retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async updateBugState(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { bugState } = req.body;
            const { userType } = req.decodedToken;

            if (userType !== 'admin' && userType !== 'staff') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const bugReport = await BugReport.findByPk(id);

            if (!bugReport) {
                throw ({ name: "BUG_REPORT_NOT_FOUND" });
            }

            await bugReport.update({ bugState }, { transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Bug report state updated successfully',
                data: {
                    id: bugReport.id,
                    bugState: bugReport.bugState,
                    updatedAt: bugReport.updatedAt
                }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async deleteBugReport(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { userType } = req.decodedToken;

            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const bugReport = await BugReport.findByPk(id);

            if (!bugReport) {
                throw ({ name: "BUG_REPORT_NOT_FOUND" });
            }

            await bugReport.destroy({ transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Bug report deleted successfully',
                deletedBugReportId: id
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}

module.exports = bugReportController;