const AvailabilityModel = require('../Models/Availability')
exports.getSubmittedAvailability = async (req, res) => {
    try {
        const { hideAssigned, uid } = req.query;

        const pipeline = [
            {
                $lookup: {
                    from: 'Users',
                    localField: 'uid',
                    foreignField: 'uid',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'Users',
                    localField: 'assignedBy',
                    foreignField: 'uid',
                    as: 'manager',
                },
            },
            {
                $unwind: {
                    path: '$manager',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ];

        // Add filtering for `hideAssigned`
        if (hideAssigned === 'true') {
            pipeline.push({
                $match: {
                    assignedWork: { $eq: '' },
                },
            });
        }

        // Add filtering for `uid` if provided
        if (uid && uid.trim()) {
            pipeline.push({
                $match: {
                    uid: uid.trim(),
                },
            });
        }

        const availabilities = await AvailabilityModel.aggregate(pipeline);

        res.json({
            status: 200,
            message: 'success',
            data: availabilities,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'error',
            data: {
                info: error.message,
            },
        });
    }
};

exports.submitAvailability = async (req, res) => {
    const { uid, numberOfHours, date, assignedWork, assignedBy } = req.body;

    try {
        const newAvailability = new AvailabilityModel({
            uid,
            numberOfHours,
            date,
            assignedWork,
            assignedBy,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        });

        await newAvailability.save();

        res.json({
            status: 200,
            message: 'success',
            data: {
                info: 'Availability submitted successfully',
                availability: newAvailability,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'error',
            data: {
                info: error.message,
            },
        });
    }
};

exports.editAvailability = async (req, res) => {
    const { id } = req.params;
    const { assignedWork, assignedBy, numberOfHours } = req.body;

    console.log('ReqBody : ', req.body)

    try {
        const updatedAvailability = await AvailabilityModel.findByIdAndUpdate(
            id,
            {
                assignedWork,
                numberOfHours,
                assignedBy,
                updatedAt: new Date().getTime(),
            },
            { new: true }
        );

        if (!updatedAvailability) {
            return res.status(404).json({
                status: 404,
                message: 'error',
                data: {
                    info: 'Availability not found',
                },
            });
        }

        res.json({
            status: 200,
            message: 'success',
            data: {
                info: 'Availability updated successfully',
                availability: updatedAvailability,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'error',
            data: {
                info: error.message,
            },
        });
    }
};

exports.deleteAvailability = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAvailability = await AvailabilityModel.findByIdAndDelete(id);

        if (!deletedAvailability) {
            return res.status(404).json({
                status: 404,
                message: 'error',
                data: {
                    info: 'Availability not found',
                },
            });
        }

        res.json({
            status: 200,
            message: 'success',
            data: {
                info: 'Availability deleted successfully',
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'error',
            data: {
                info: error.message,
            },
        });
    }
};
