const {User, UserProfile, sequelize, Post} = require("../models/index.js");
const { Op } = require("sequelize");

class dashboardController{
    static async getTotalCreatedUserAccount(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType !=='admin'){
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

    static async getMonthlyCreatedUserAccount(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentYear = new Date().getFullYear();
            const monthlyCreatedAccounts = await User.findAll({
                attributes: [
                    'id',
                    'username',
                    'email',
                    'gender',
                    'birthDate',
                    'createdAt',
                    [sequelize.fn('date_trunc', 'month', sequelize.col('User.createdAt')), 'month']
                ],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl']
                }],
                where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('User.createdAt')), currentYear),
                order: [[sequelize.col('User.createdAt'), 'ASC']]
            });

            const formattedAccounts = monthlyCreatedAccounts.map(user => ({
                id: user.id,
                username: user.username,
                profilePicture: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                email: user.email,
                gender: user.gender,
                birthDate: user.birthDate,
                createdAt: user.createdAt,
                month: user.dataValues.month
            }));

            res.status(200).json({
                data: formattedAccounts,
                msg: 'Monthly Created User Account retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getYearlyCreatedUserAccount(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const yearlyCreatedAccounts = await User.findAll({
                attributes: [
                    'id',
                    'username',
                    'email',
                    'gender',
                    'birthDate',
                    'createdAt',
                    [sequelize.fn('date_trunc', 'year', sequelize.col('createdAt')), 'year']
                ],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl']
                }],
                order: [['createdAt', 'DESC']]
            });

            const formattedAccounts = yearlyCreatedAccounts.map(user => ({
                id: user.id,
                username: user.username,
                profilePicture: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                email: user.email,
                gender: user.gender,
                birthDate: user.birthDate,
                createdAt: user.createdAt,
                year: user.dataValues.year
            }));

            res.status(200).json({
                data: formattedAccounts,
                msg: 'Yearly Created User Account retrieved successfully'
            });
        } catch (error) {
            next(error);
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

    static async getTotalUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const totalUsers = await User.findAll({
                attributes: ['id', 'username', 'email', 'gender', 'birthDate', 'createdAt'],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl'],
                }],
                order: [['createdAt', 'DESC']]
            });

            const formattedUsers = totalUsers.map(user => ({
                id: user.id,
                profilePicture: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                username: user.username,
                email: user.email,
                gender: user.gender,
                birthDate: user.birthDate,
                createdAt: user.createdAt
            }));

            const totalUsersCount = totalUsers.length;

            res.status(200).json({
                data: { count: totalUsersCount, users: formattedUsers },
                msg: 'Total users retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getMonthlyUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentYear = new Date().getFullYear();
            const monthlyUsers = await User.findAll({
                attributes: [
                    [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
                    [sequelize.fn('count', sequelize.col('id')), 'count']
                ],
                where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('createdAt')), currentYear),
                group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
                order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']]
            });

            res.status(200).json({
                data: monthlyUsers,
                msg: 'Monthly users retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getYearlyUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const yearlyUsers = await User.findAll({
                attributes: [
                    [sequelize.fn('date_trunc', 'year', sequelize.col('createdAt')), 'year'],
                    [sequelize.fn('count', sequelize.col('id')), 'count']
                ],
                group: [sequelize.fn('date_trunc', 'year', sequelize.col('createdAt'))],
                order: [[sequelize.fn('date_trunc', 'year', sequelize.col('createdAt')), 'ASC']]
            });

            res.status(200).json({
                data: yearlyUsers,
                msg: 'Yearly users retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getMonthlyActiveUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentYear = new Date().getFullYear();
            const monthlyActiveUsers = await sequelize.query(`
                SELECT DATE_TRUNC('month', date) as month, COUNT(DISTINCT user_id) as count,
                       ARRAY_AGG(DISTINCT user_id) as user_ids
                FROM (
                    SELECT "userId" as user_id, "createdAt" as date FROM "Posts"
                    UNION
                    SELECT "userId" as user_id, "createdAt" as date FROM "Comments"
                    UNION
                    SELECT "userId" as user_id, "createdAt" as date FROM "UserLikes"
                    UNION
                    SELECT "userId" as user_id, "createdAt" as date FROM "TravelPlans"
                ) as user_activities
                WHERE EXTRACT(YEAR FROM date) = :year
                GROUP BY DATE_TRUNC('month', date)
                ORDER BY month ASC
            `, {
                replacements: { year: currentYear },
                type: sequelize.QueryTypes.SELECT
            });

            const userDetails = await User.findAll({
                where: {
                    id: {
                        [Op.in]: monthlyActiveUsers.flatMap(month => month.user_ids)
                    }
                },
                attributes: ['id', 'username', 'email', 'gender', 'birthDate', 'createdAt'],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl'],
                }],
            });

            const formattedData = monthlyActiveUsers.map(month => ({
                month: month.month,
                count: month.count,
                users: userDetails.filter(user => month.user_ids.includes(user.id)).map(user => ({
                    id: user.id,
                    profilePicture: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                    username: user.username,
                    email: user.email,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    createdAt: user.createdAt
                }))
            }));

            res.status(200).json({
                data: formattedData,
                msg: 'Monthly active users retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getYearlyActiveUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const yearlyActiveUsers = await sequelize.query(`
                SELECT DATE_TRUNC('year', date) as year, COUNT(DISTINCT user_id) as count,
                       ARRAY_AGG(DISTINCT user_id) as user_ids
                FROM (
                    SELECT "userId" as user_id, "createdAt" as date FROM "Posts"
                    UNION
                    SELECT "userId" as user_id, "createdAt" as date FROM "Comments"
                    UNION
                    SELECT "userId" as user_id, "createdAt" as date FROM "UserLikes"
                    UNION
                    SELECT "userId" as user_id, "createdAt" as date FROM "TravelPlans"
                ) as user_activities
                GROUP BY DATE_TRUNC('year', date)
                ORDER BY year ASC
            `, {
                type: sequelize.QueryTypes.SELECT
            });

            const userDetails = await User.findAll({
                where: {
                    id: {
                        [Op.in]: yearlyActiveUsers.flatMap(year => year.user_ids)
                    }
                },
                attributes: ['id', 'username', 'email', 'gender', 'birthDate', 'createdAt'],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl'],
                }],
            });

            const formattedData = yearlyActiveUsers.map(year => ({
                year: year.year,
                count: year.count,
                users: userDetails.filter(user => year.user_ids.includes(user.id)).map(user => ({
                    id: user.id,
                    profilePicture: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                    username: user.username,
                    email: user.email,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    createdAt: user.createdAt
                }))
            }));

            res.status(200).json({
                data: formattedData,
                msg: 'Yearly active users retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getMonthlyPosts(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentYear = new Date().getFullYear();
            const monthlyPosts = await Post.findAll({
                attributes: [
                    'id',
                    'postTitle',
                    [sequelize.col('User.username'), 'username'],
                    'createdAt',
                    [sequelize.fn('date_trunc', 'month', sequelize.col('Post.createdAt')), 'month'],
                ],
                include: [{
                    model: User,
                    attributes: []
                }],
                where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('Post.createdAt')), currentYear),
                order: [[sequelize.col('Post.createdAt'), 'DESC']]
            });

            res.status(200).json({
                data: monthlyPosts,
                msg: 'Monthly posts retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getYearlyPosts(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }
    
            const yearlyPosts = await Post.findAll({
                attributes: [
                    'id',
                    'postTitle',
                    [sequelize.col('User.username'), 'username'],
                    'createdAt',
                    [sequelize.fn('date_trunc', 'month', sequelize.col('Post.createdAt')), 'month'],
                ],
                include: [{
                    model: User,
                    attributes: []
                }],
                order: [[sequelize.col('Post.createdAt'), 'DESC']]
            });
    
            const formattedPosts = yearlyPosts.map(post => ({
                id: post.id,
                postTitle: post.postTitle,
                username: post.username,
                createdAt: post.createdAt,
                month: post.dataValues.month
            }));
    
            res.status(200).json({
                data: formattedPosts,
                msg: 'Yearly posts retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getMonthlyBannedUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentYear = new Date().getFullYear();
            const monthlyBannedUsers = await sequelize.query(`
                SELECT DATE_TRUNC('month', ub."createdAt") as month,
                       COUNT(DISTINCT ub."userID") as count,
                       json_agg(json_build_object(
                           'id', u.id,
                           'username', u.username,
                           'email', u.email,
                           'gender', u.gender,
                           'birthDate', u."birthDate",
                           'createdAt', u."createdAt",
                           'profilePictureUrl', up."profilePictureUrl"
                       )) as users
                FROM "userBans" ub
                JOIN "Users" u ON ub."userID" = u.id
                LEFT JOIN "UserProfiles" up ON u.id = up."userId"
                WHERE EXTRACT(YEAR FROM ub."createdAt") = :year
                GROUP BY DATE_TRUNC('month', ub."createdAt")
                ORDER BY month ASC
            `, {
                replacements: { year: currentYear },
                type: sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                data: monthlyBannedUsers,
                msg: 'Monthly banned users retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getYearlyBannedUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const yearlyBannedUsers = await sequelize.query(`
                SELECT DATE_TRUNC('year', ub."createdAt") as year,
                       COUNT(DISTINCT ub."userID") as count,
                       json_agg(json_build_object(
                           'id', u.id,
                           'username', u.username,
                           'email', u.email,
                           'gender', u.gender,
                           'birthDate', u."birthDate",
                           'createdAt', u."createdAt",
                           'profilePictureUrl', up."profilePictureUrl"
                       )) as users
                FROM "userBans" ub
                JOIN "Users" u ON ub."userID" = u.id
                LEFT JOIN "UserProfiles" up ON u.id = up."userId"
                GROUP BY DATE_TRUNC('year', ub."createdAt")
                ORDER BY year ASC
            `, {
                type: sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                data: yearlyBannedUsers,
                msg: 'Yearly banned users retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getActiveUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const activeUsers = await sequelize.query(`
                SELECT DISTINCT user_id
                FROM (
                    SELECT "userId" as user_id FROM "Posts"
                    UNION
                    SELECT "userId" as user_id FROM "Comments"
                    UNION
                    SELECT "userId" as user_id FROM "UserLikes"
                    UNION
                    SELECT "userId" as user_id FROM "TravelPlans"
                ) as user_activities
            `, {
                type: sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                data: activeUsers.length,
                msg: 'Active users count retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getTotalUsersDetailed(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const users = await User.findAll({
                attributes: ['id', 'username', 'email', 'createdAt'],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl'],
                }],
            });

            const formattedUsers = users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                profilePictureUrl: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                createdAt: user.createdAt
            }));

            res.status(200).json({
                data: formattedUsers,
                msg: 'Total users detailed data retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = dashboardController;