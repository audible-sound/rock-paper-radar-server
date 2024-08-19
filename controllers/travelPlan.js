const { TravelPlan, User, TravelTag, sequelize } = require('../models/index.js');

class TravelPlanController {
    static async createTravelPlan(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { title, duration, location, categories, pictureUrl } = req.body;
            const { username } = req.decodedToken;

            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error('USER_NOT_FOUND');
            }

            const travelPlan = await TravelPlan.create(
                { title, duration, location, pictureUrl, userId: user.id },
                { transaction }
            );

            if (categories && categories.length > 0) {
                const travelTags = categories.map(name => ({
                    name,
                    travelId: travelPlan.id
                }));
                const respond = await TravelTag.bulkCreate(travelTags, { transaction });
                console.log(respond);
            }

            await transaction.commit();
            res.status(201).json({
                message: 'Travel plan created successfully',
                travelPlan
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async editTravelPlan(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            let { id } = req.params;
            id = parseInt(id);
            const { title, duration, location, categories, pictureUrl } = req.body;
            const { username } = req.decodedToken;

            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error('USER_NOT_FOUND');
            }

            const travelPlan = await TravelPlan.findOne({ 
                where: { id, userId: user.id },
                include: [TravelTag]
            });

            if (!travelPlan) {
                throw new Error('TRAVEL_PLAN_NOT_FOUND');
            }

            await travelPlan.update({ title, duration, location, pictureUrl }, { transaction });

            if (categories && categories.length > 0) {
                await TravelTag.destroy({ where: { travelId: id }, transaction });
                const travelTags = categories.map(name => ({
                    name,
                    travelId: id
                }));
                await TravelTag.bulkCreate(travelTags, { transaction });
            }

            await transaction.commit();
            res.status(200).json({
                message: 'Travel plan updated successfully',
                travelPlan
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async deleteTravelPlan(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            let { id } = req.params;
            id = parseInt(id);
            const { username } = req.decodedToken;

            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error('USER_NOT_FOUND');
            }

            const travelPlan = await TravelPlan.findOne({ 
                where: { id, userId: user.id }
            });

            if (!travelPlan) {
                throw new Error('TRAVEL_PLAN_NOT_FOUND');
            }

            await TravelTag.destroy({ where: { travelId: id }, transaction });
            await travelPlan.destroy({ transaction });

            await transaction.commit();
            res.status(200).json({
                message: 'Travel plan deleted successfully'
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async getTravelPlanById(req, res, next) {
        try {
            let { id } = req.params;
            id = parseInt(id);
            const { username } = req.decodedToken;

            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error('USER_NOT_FOUND');
            }

            const travelPlan = await TravelPlan.findOne({ 
                where: { id, userId: user.id },
                include: [TravelTag]
            });

            if (!travelPlan) {
                throw new Error('TRAVEL_PLAN_NOT_FOUND');
            }

            res.status(200).json({
                message: 'Travel plan retrieved successfully',
                travelPlan
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserTravelPlans(req, res, next) {
        try {
            const { username } = req.decodedToken;

            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error('USER_NOT_FOUND');
            }

            const travelPlans = await TravelPlan.findAll({
                where: { userId: user.id },
                include: [TravelTag],
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json({
                message: 'User travel plans retrieved successfully',
                travelPlans
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = TravelPlanController;