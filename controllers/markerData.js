const { MarkerData, User, sequelize } = require('../models/index.js');

class markerDataController {
    static async createMarker(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { username } = req.decodedToken;
            const {
                type,
                latitude,
                longitude,
            } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw { name: 'USER_NOT_FOUND' };
            }
            await MarkerData.create({
                type,
                lat: latitude,
                lng: longitude,
                userId: user.id
            }, { transaction });
            await transaction.commit();
            res.status(201).json({
                message: 'Marker created successfully',
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
    static async getMarkers(req, res, next) {
        try {
            const markers = await MarkerData.findAll();
            res.status(200).json({
                message: 'Markers fetched successfully',
                markers
            });
        } catch (error) {
            next(error);
        }
    }
    static async deleteMarker(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            await MarkerData.destroy({ where: { id } }, { transaction });
            await transaction.commit();
            res.status(200).json({
                message: 'Marker deleted successfully'
            });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}

module.exports = markerDataController;
