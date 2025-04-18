class AggregatorService {
    static getMailLogs(page = 1, limit = 100) {
        const pipeline = [
            {
                $sort: {
                    sentAt: -1
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 0,
                    email: 1,
                    type: 1,
                    sentAt: 1
                }
            }
        ];
        return pipeline
    }

    static getAllUsersMail() {
        const pipeline = [
            {
                $group: {
                    _id: '$email'
                }
            },
            {
                $group: {
                    _id: null,
                    users: {
                        $push: '$_id'
                    }
                }
            }
        ]
        return pipeline
    }

    static getUsersList(query) {
        let { page = 1, limit = 100 } = query;
        page = Math.max(parseInt(page, 10) || 1, 1);
        limit = Math.max(parseInt(limit, 10) || 100, 1);
        const skip = (page - 1) * limit;

        const pipeline = [
            {
                $sort: { createdAt: -1 }
            },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 0,
                    password: 0,
                    authToken: 0,
                    __v: 0
                }
            }
        ]
        return pipeline
    }

    static getPaginationData(query) {
        let { page = 1, limit = 100 } = query;
        page = Math.max(parseInt(page, 10) || 1, 1);
        limit = Math.max(parseInt(limit, 10) || 100, 1);
        return { page, limit }
    }
}

module.exports = AggregatorService;
