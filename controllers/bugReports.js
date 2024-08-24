const {BugReport, User, staff, staffProfile, UserProfile, sequelize} = require("../models/index.js");

class bugReportController{
    static async createBugReport(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const {
                title,
                description,
                stepsToReproduce
            } = req.body;
            const { id, userType } = req.decodedToken;

            const createdBugReport = await BugReport.create({
                userID: id,
                userType,
                bugTitle: title,
                bugDescription: description,
                bugSteps: stepsToReproduce,
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
            var dataUser = "";
            const BugReports = await BugReport.findAll({plain:true, where: {id: req.params.id}});
            if(BugReports.userType.includes('user')){
                dataUser = await User.findOne({where: {id: BugReports.userID}, include: [UserProfile]});
            }else{
                dataUser = await staff.findOne({where: {id: BugReports.userID}, include: [staffProfile]});
            }
            const datas = {
                BugReports,
                dataUser
            }
            res.status(200).json({
                data: datas,
                msg: 'Bug Report retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }

    static async updateBugStateById(req, res, next){
        const transaction = await sequelize.transaction();
        try{
            const {bugState} = req.body
            const {userType} = req.decodedToken;
            if(!userType.includes('admin')){
                throw ({name: "UNAUTHORIZED"});
            }

            await BugReport.update({bugState},{where: {id: req.params.id}},{transaction});

            res.status(200).json({
                msg: 'Bug Report retrieved successfully'
            })
        }catch(error){
            next(error)
        }
    }
}

module.exports = bugReportController;