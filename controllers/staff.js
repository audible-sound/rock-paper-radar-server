const { staff, staffProfile, sequelize, BannedPost, BannedComment, blog, userGuide, Post, User, UserProfile, PostTag, ReportPost, ReportComment, Comment, userReport } = require("../models/index.js");
const { hashPassword, comparePassword } = require("../helpers/encryption.js");
const { createToken } = require("../helpers/accessToken.js");

class staffController {
    static async getPersonalProfile(req, res, next) {
        try {
            const { username } = req.decodedToken;
            const actualStaff = await staff.findOne({
                where: { username },
                include: [staffProfile]
            })
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: {
                    username: actualStaff.username,
                    profilePictureUrl: actualStaff.staffProfile.pictureUrl,
                    joinedDate: actualStaff.createdAt
                }
            })
        } catch (error) {
            next(error);
        }
    }

    static async getProfile(req, res, next) {
        try {
            const givenUsername = req.query.username;
            const actualStaff = await staff.findOne({
                where: { username: givenUsername },
                include: [staffProfile]
            })
            const blogsCount = await blog.count({ where: { id: actualStaff.id } })
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: {
                    username: actualStaff.username,
                    profilePictureUrl: actualStaff.staffProfile.pictureUrl,
                    totalBlogs: blogsCount,
                    joinedDate: actualStaff.createdAt,
                    createdAt: actualStaff.createdAt,
                    birthDate: actualStaff.birthDate,
                    gender: actualStaff.gender,
                    email: actualStaff.email,
                    country: actualStaff.country,
                    phoneNumber: actualStaff.phoneNumber,
                    description: actualStaff.staffProfile.profileDescription
                }
            })
        } catch (error) {
            next(error);
        }
    }

    static async editstaffProfile(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id, userType } = req.decodedToken;
            const staffProfileToBeEdited = await staff.findAll({ plain: true, where: { id } });
            const blogsCount = await blog.count({ where: { staffID: id } });
            if (!staffProfileToBeEdited || userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }

            const {
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                profilePictureUrl
            } = req.body;

            await staff.update({
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
            }, {
                where: { id }
            }, {
                transaction
            });

            await staffProfile.update({
                profileDescription,
                pictureUrl: profilePictureUrl
            }, {
                where: { staffID: id }
            }, {
                transaction
            });
            await transaction.commit();

            res.status(200).json({
                msg: 'Staff profile edited successfully',
                data: {
                    blogsCount: blogsCount,
                    profilePictureUrl: profilePictureUrl
                }
            });
        } catch (error) {
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async signIn(req, res, next) {
        try {
            const { username, password } = req.body;
            const actualStaff = await staff.findOne({
                where: { username },
                include: [staffProfile]
            });
            if (!actualStaff) {
                throw ({ name: "INVALID_USERNAME" });
            }

            const isMatch = await comparePassword(password, actualStaff.password);
            if (!isMatch) {
                throw ({ name: "INVALID_PASSWORD" });
            }

            const data = {
                username: actualStaff.username,
                pictureUrl: actualStaff.staffProfile.pictureUrl,
                userType: actualStaff.userType
            }

            const payload = {
                username: actualStaff.username,
                id: actualStaff.id,
                userType: actualStaff.userType,
                date: new Date()
            }
            const accessToken = createToken(payload);

            res.status(200).json({
                message: 'Staff signed in successfully',
                data,
                accessToken
            });
        } catch (error) {
            next(error);
        }
    }

    static async registerStaff(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const {
                username,
                password,
                confirmPassword,
                userType,
                email,
                birthDate,
                gender,
                country,
                phoneNumber,
                profileDescription,
                pictureUrl
            } = req.body;

            if (password != confirmPassword) {
                throw ({ name: "PASSWORDS_DO_NOT_MATCH" });
            }

            const hashedPassword = await hashPassword(password);

            const createdStaff = await staff.create({
                username,
                password: hashedPassword,
                userType,
                email,
                birthDate,
                gender,
                country,
                phoneNumber
            }, {
                transaction
            });

            const createdStaffProfile = await staffProfile.create({
                staffID: createdStaff.id,
                profileDescription: profileDescription,
                pictureUrl: pictureUrl
            }, {
                transaction
            });

            await transaction.commit();

            const data = {
                username: createdStaff.username,
                pictureUrl: createdStaffProfile.profilePicture
            }

            const payload = {
                username: createdStaff.username,
                id: createdStaff.id,
                userType: createdStaff.userType,
                date: new Date()
            }
            const accessToken = createToken(payload);

            res.status(201).json({
                message: 'Staff registered successfully',
                data,
                accessToken
            })
        } catch (error) {
            if (error.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(error);
        }
    }

    static async getReportPost(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }

            const reportPost = await ReportPost.findAll({ include: [User] });
            console.log(reportPost);

            res.status(200).json({
                data: reportPost,
                msg: 'User Report retrieved successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    static async createBannedPost(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { userType } = req.decodedToken;
            if (userType != 'staff') {
                throw ({ name: "UNAUTHORIZED" });
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const {
                reportId,
            } = req.body;

            const createdBannedPost = await BannedPost.create({
                reportId,
            }, { transaction });
            await transaction.commit();

            const data = {
                id: createdBannedPost.id,
                date: createdBannedPost.createdAt
            }

            res.status(201).json({
                msg: 'Banned post created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async getBannedPost(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType != 'staff') {
                throw ({ name: "UNAUTHORIZED" });
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const createdBannedPost = await BannedPost.findAll();

            res.status(200).json({
                data: createdBannedPost,
                msg: 'Banned Post retrieved successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    static async getReportComment(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType != 'staff') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const getReportComment = await ReportComment.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: ['commentContent']
                    }
                ]
            });

            const formattedReportComments = getReportComment.map(report => ({
                ...report.toJSON(),
                username: report.User.username,
                commentContent: report.Comment.commentContent
            }));

            res.status(200).json({
                data: formattedReportComments,
                msg: 'User Report retrieved successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    static async createBannedComment(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { userType } = req.decodedToken;
            if (userType != 'staff') {
                throw ({ name: "UNAUTHORIZED" });
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const {
                reportId,
            } = req.body;

            const createdBannedComment = await BannedComment.create({
                reportId,
            }, { transaction });
            await transaction.commit();

            const data = {
                id: createdBannedComment.id,
                date: createdBannedComment.createdAt
            }

            res.status(201).json({
                msg: 'Banned comment created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async getBannedComment(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType != 'staff') {
                throw ({ name: "UNAUTHORIZED" });
            }
            const { username } = req.decodedToken;
            const actualUser = await staff.findOne({ where: { username } });
            if (!actualUser) {
                throw new Error('USER_NOT_FOUND');
            }

            const createdBannedComment = await BannedComment.findAll();

            res.status(200).json({
                data: createdBannedComment,
                msg: 'Banned Comment retrieved successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateStaffAccount(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { userType, password } = req.body;

            if (!userType) {
                throw ({ name: "MISSING_USER_TYPE" });
            }

            const staffToUpdate = await staff.findByPk(id);

            if (!staffToUpdate) {
                throw ({ name: "STAFF_NOT_FOUND" });
            }

            const updateData = { userType };

            if (password) {
                const hashedPassword = await hashPassword(password);
                updateData.password = hashedPassword;
            }

            await staff.update(updateData, {
                where: { id },
                transaction
            });

            await transaction.commit();

            res.status(200).json({
                message: 'Staff account updated successfully',
                data: {
                    id,
                    userType: updateData.userType,
                    passwordUpdated: !!password
                }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async deleteStaff(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { userType } = req.decodedToken;

            if (userType !== 'admin') {
                throw ({ name: "UNAUTHORIZED" });
            }

            const staffToDelete = await staff.findByPk(id);

            if (!staffToDelete) {
                throw ({ name: "STAFF_NOT_FOUND" });
            }

            // Delete associated records
            await staffProfile.destroy({ where: { staffID: id }, transaction });
            await blog.destroy({ where: { staffID: id }, transaction });
            await userGuide.destroy({ where: { staffID: id }, transaction });

            // Delete the staff record
            await staffToDelete.destroy({ transaction });

            await transaction.commit();

            res.status(200).json({
                message: 'Staff and associated records deleted successfully',
                deletedStaffId: id
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async getTravelPostById(req, res, next) {
        try {
            const { id } = req.params;
            const post = await Post.findOne({
                where: { id },
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                        include: [{
                            model: UserProfile,
                            attributes: ['profilePictureUrl']
                        }]
                    },
                    {
                        model: PostTag,
                        attributes: ['name']
                    }
                ]
            });

            if (!post) {
                throw new Error('POST_NOT_FOUND');
            }

            res.status(200).json({
                data: post,
                msg: 'Post retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getReportUser(req, res, next) {
        try {
            const { userType } = req.decodedToken;
            if (userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }
            
            const reportUsers = await userReport.findAll();

            const formattedReportUsers = reportUsers.map(report => ({
                id: report.id,
                reportContent: report.reportContent,
                reportState: report.reportState,
                createdAt: report.createdAt,
            }));

            res.status(200).json({
                data: formattedReportUsers,
                msg: 'User Report retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateReportPostState(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { userType } = req.decodedToken;
            if (userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }

            const { reportId, state } = req.body;
            console.log(state);
            console.log(state !== 'Banned');
            if (state !== 'False report' && state !== 'Banned') {
                throw ({ name: "INVALID_STATE" });
            }

            const updatedReportPost = await ReportPost.update(
                { reportState: state },
                {
                    where: { id: reportId },
                    transaction
                }
            );

            if (updatedReportPost[0] === 0) {
                throw ({ name: "REPORT_NOT_FOUND" });
            }

            if (state === 'Banned') {
                await BannedPost.create(
                    { reportId },
                    { transaction }
                );
            }

            await transaction.commit();

            res.status(200).json({
                msg: `Report state updated to ${state} successfully`,
                data: { reportId, state }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async updateReportCommentState(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { userType } = req.decodedToken;
            if (userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }

            const { reportId, state } = req.body;

            if (state !== 'False report' && state !== 'Banned') {
                throw ({ name: "INVALID_STATE" });
            }

            const updatedReportComment = await ReportComment.update(
                { reportState: state },
                {
                    where: { id: reportId },
                    transaction
                }
            );

            if (updatedReportComment[0] === 0) {
                throw ({ name: "REPORT_NOT_FOUND" });
            }

            if (state === 'Banned') {
                await BannedComment.create(
                    { reportId },
                    { transaction }
                );
            }

            await transaction.commit();

            res.status(200).json({
                msg: `Report state updated to ${state} successfully`,
                data: { reportId, state }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async updateReportUserState(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { userType } = req.decodedToken;
            if (userType.includes('user')) {
                throw ({ name: "UNAUTHORIZED" });
            }

            const { reportId, state } = req.body;

            if (state !== 'False Report' && state !== 'Banned') {
                throw ({ name: "INVALID_STATE" });
            }
            const updatedReportComment = await userReport.update(
                { reportState: state },
                {
                    where: { id: reportId },
                    transaction
                }
            );

            if (updatedReportComment[0] === 0) {
                throw ({ name: "REPORT_NOT_FOUND" });
            }
            
            await transaction.commit();

            res.status(200).json({
                msg: `Report state updated to ${state} successfully`,
                data: { reportId, state }
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }

    }

};

module.exports = staffController;