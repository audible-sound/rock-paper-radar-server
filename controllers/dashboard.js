const {User, UserProfile, sequelize, Post, userReport, PostTag} = require("../models/index.js");
const { Op } = require("sequelize");

class dashboardController{
    static async getTotalCreatedUserAccount(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const totalUsers = await User.count();

            res.status(200).json({
                data: totalUsers,
                msg: 'Total Created User Account retrieved successfully'
            });
        } catch (error) {
            next(error);
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
                    'birthDate',
                    'createdAt',
                    'gender',
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
                birthDate: user.birthDate,
                createdAt: user.createdAt,
                gender: user.gender,
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

            const currentYear = new Date().getFullYear();
            const yearlyCreatedAccounts = await User.findAll({
                attributes: [
                    'id',
                    'username',
                    'email',
                    'birthDate',
                    'createdAt',
                    'gender',
                    [sequelize.fn('date_trunc', 'year', sequelize.col('User.createdAt')), 'year']
                ],
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl']
                }],
                where: {
                    createdAt: {
                        [Op.gte]: new Date(currentYear - 4, 0, 1)
                    }
                },
                order: [['createdAt', 'DESC']]
            });

            const formattedAccounts = yearlyCreatedAccounts.map(user => ({
                id: user.id,
                username: user.username,
                profilePicture: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                email: user.email,
                birthDate: user.birthDate,
                createdAt: user.createdAt,
                gender: user.gender,
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
            if(userType !== 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            const MonthlyCreatedPosts = await Post.findAll({
                attributes: [
                    'id',
                    'postTitle',
                    'createdAt',
                    [sequelize.fn('date_trunc', 'month', sequelize.col('Post.createdAt')), 'month']
                ],
                where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('Post.createdAt')), currentYear),
                include: [{
                    model: User,
                    attributes: ['username'],
                    include: [{
                        model: UserProfile,
                        attributes: ['profilePictureUrl']
                    }]
                }],
                order: [['createdAt', 'DESC']]
            });

            const formattedPosts = MonthlyCreatedPosts.map(post => ({
                id: post.id,
                postTitle: post.postTitle,
                createdAt: post.createdAt,
                month: post.dataValues.month,
                author: {
                    username: post.User.username,
                    profilePictureUrl: post.User.UserProfile.profilePictureUrl
                }
            }));

            res.status(200).json({
                data: formattedPosts,
                msg: 'Monthly Created Posts retrieved successfully'
            });
        } catch(error){
            next(error);
        }
    }

    static async getYearlyCreatedPost(req, res, next){
        try{
            const {userType} = req.decodedToken;
            if(userType !== 'staff'){
                throw ({name: "UNAUTHORIZED"});
            }

            const currentDate = new Date();
            const fiveYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 5));

            const YearlyCreatedPosts = await Post.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: fiveYearsAgo
                    }
                },
                include: [{
                    model: User,
                    attributes: ['username'],
                    include: [{
                        model: UserProfile,
                        attributes: ['profilePictureUrl']
                    }]
                }],
                order: [['createdAt', 'DESC']]
            });

            const formattedPosts = YearlyCreatedPosts.map(post => ({
                id: post.id,
                postTitle: post.postTitle,
                createdAt: post.createdAt,
                author: {
                    username: post.User.username,
                    profilePictureUrl: post.User.UserProfile.profilePictureUrl
                }
            }));

            res.status(200).json({
                data: formattedPosts,
                msg: 'Yearly Created Posts retrieved successfully'
            });
        } catch(error){
            next(error);
        }
    }

    static async getTotalUsers(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentYear = new Date().getFullYear();
            const totalUsersPerMonth = await User.findAll({
                attributes: [
                    [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
                    [sequelize.fn('count', sequelize.col('id')), 'count']
                ],
                where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('createdAt')), currentYear),
                group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
                order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']]
            });

            const formattedData = totalUsersPerMonth.map((item, index) => ({
                month: new Date(item.dataValues.month).toLocaleString('default', { month: 'short' }),
                count: item.dataValues.count,
                totalUsers: totalUsersPerMonth.slice(0, index + 1).reduce((sum, curr) => sum + parseInt(curr.dataValues.count), 0)
            }));

            res.status(200).json({
                data: formattedData,
                msg: 'Total users per month retrieved successfully'
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

            const currentDate = new Date();
            const oneYearAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));

            const monthlyUsers = await User.findAll({
                attributes: [
                    'id',
                    'username',
                    'email',
                    'createdAt',
                    [sequelize.fn('date_trunc', 'month', sequelize.col('User.createdAt')), 'month']
                ],
                where: {
                    createdAt: {
                        [Op.gte]: oneYearAgo
                    }
                },
                order: [['createdAt', 'ASC']]
            });

            const formattedData = monthlyUsers.reduce((acc, user) => {
                const month = new Date(user.dataValues.month).toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!acc[month]) {
                    acc[month] = [];
                }
                acc[month].push({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    joinedAt: user.createdAt
                });
                return acc;
            }, {});

            res.status(200).json({
                data: formattedData,
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

            const currentYear = new Date().getFullYear();
            const fiveYearsAgo = currentYear - 4;

            const yearlyUsers = await User.findAll({
                attributes: [
                    'id',
                    'username',
                    'email',
                    'createdAt',
                    [sequelize.fn('date_trunc', 'year', sequelize.col('User.createdAt')), 'year']
                ],
                where: {
                    createdAt: {
                        [Op.gte]: new Date(`${fiveYearsAgo}-01-01`)
                    }
                },
                include: [{
                    model: UserProfile,
                    attributes: ['profilePictureUrl']
                }],
                order: [[sequelize.col('User.createdAt'), 'ASC']]
            });

            const formattedData = yearlyUsers.reduce((acc, user) => {
                const year = new Date(user.dataValues.year).getFullYear().toString();
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.UserProfile ? user.UserProfile.profilePictureUrl : null,
                    joinedAt: user.createdAt
                });
                return acc;
            }, {});

            res.status(200).json({
                data: formattedData,
                msg: 'Yearly users for the past five years retrieved successfully'
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
            const startOfYear = new Date(currentYear, 0, 1);
            const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

            const bannedUsers = await userReport.findAll({
                where: {
                    reportState: 'Banned',
                    createdAt: {
                        [Op.between]: [startOfYear, endOfYear]
                    }
                },
                include: [{
                    model: User,
                    as: 'ReportedUser',
                    attributes: ['id', 'username', 'email', 'createdAt'],
                    include: [{
                        model: UserProfile,
                        attributes: ['profilePictureUrl']
                    }]
                }],
                order: [['createdAt', 'ASC']]
            });

            const monthlyBannedUsers = bannedUsers.reduce((acc, report) => {
                const month = report.createdAt.toLocaleString('default', { month: 'long' });
                if (!acc[month]) {
                    acc[month] = [];
                }
                acc[month].push({
                    id: report.ReportedUser.id,
                    username: report.ReportedUser.username,
                    email: report.ReportedUser.email,
                    profilePictureUrl: report.ReportedUser.UserProfile ? report.ReportedUser.UserProfile.profilePictureUrl : null,
                    joinedDate: report.ReportedUser.createdAt,
                    bannedDate: report.createdAt
                });
                return acc;
            }, {});

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

            const currentYear = new Date().getFullYear();
            const fiveYearsAgo = new Date(currentYear - 4, 0, 1);

            const bannedUsers = await userReport.findAll({
                where: {
                    reportState: 'Banned',
                    createdAt: {
                        [Op.gte]: fiveYearsAgo
                    }
                },
                include: [{
                    model: User,
                    as: 'ReportedUser',
                    attributes: ['id', 'username', 'email', 'createdAt'],
                    include: [{
                        model: UserProfile,
                        attributes: ['profilePictureUrl']
                    }]
                }],
                order: [['createdAt', 'ASC']]
            });

            const yearlyBannedUsers = bannedUsers.reduce((acc, report) => {
                const year = report.createdAt.getFullYear().toString();
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push({
                    id: report.ReportedUser.id,
                    username: report.ReportedUser.username,
                    email: report.ReportedUser.email,
                    profilePictureUrl: report.ReportedUser.UserProfile ? report.ReportedUser.UserProfile.profilePictureUrl : null,
                    joinedDate: report.ReportedUser.createdAt,
                    bannedDate: report.createdAt
                });
                return acc;
            }, {});

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

    static async getMonthlyTagDistribution(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            const tagDistribution = await PostTag.findAll({
                attributes: [
                    'name',
                    [sequelize.fn('COUNT', sequelize.col('name')), 'count']
                ],
                include: [{
                    model: Post,
                    attributes: [],
                    where: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "Post"."createdAt"')), currentYear),
                            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "Post"."createdAt"')), currentMonth)
                        ]
                    }
                }],
                group: ['PostTag.name'],
                order: [[sequelize.fn('COUNT', sequelize.col('name')), 'DESC']]
            });

            res.status(200).json({
                data: tagDistribution,
                msg: 'Monthly tag distribution retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getYearlyTagDistribution(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType !== 'staff' && userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const currentYear = new Date().getFullYear();

            const tagDistribution = await PostTag.findAll({
                attributes: [
                    'name',
                    [sequelize.fn('COUNT', sequelize.col('name')), 'count']
                ],
                include: [{
                    model: Post,
                    attributes: [],
                    where: sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "Post"."createdAt"')), currentYear)
                }],
                group: ['PostTag.name'],
                order: [[sequelize.fn('COUNT', sequelize.col('name')), 'DESC']]
            });

            res.status(200).json({
                data: tagDistribution,
                msg: 'Yearly tag distribution retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = dashboardController;