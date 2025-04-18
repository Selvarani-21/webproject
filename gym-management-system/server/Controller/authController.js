const UserModel = require('../Models/User')

const bcrypt = require('bcryptjs')
const { generateFromEmail } = require('unique-username-generator')

const StringService = require('../Service/StringService')
const AuthService = require('../Service/AuthService')
const MongooseService = require('../Service/MongooseService')
const UserService = new MongooseService(UserModel);
const { sendResponse } = require('../Middleware/sendResponse')
const AggregatorService = require('../Service/AggregatorService')

exports.signupv2 = async (req, res) => {
    try {
        console.log('Request body : ', req.body);
        const { email, password } = req.body;

        // Check if email already exists
        const emailExists = await UserService.countDocuments({ email });
        if (emailExists > 0) {
            return sendResponse(res, 400, { info: 'Email already exists!' });
        }

        // Generate unique identifiers
        const userID = await StringService.generateUserId();
        const username = generateFromEmail(email, 2);
        const encryptedPassword = await StringService.getEncryptedPassword(password);

        const generateNumericId = async () => {
            return await UserModel.countDocuments()
        };

        const numericId = await generateNumericId();

        // Create or update user
        await UserService.update(
            { uid: userID },
            {
                uid: userID,
                id: numericId + 1, // Assign the new numeric ID
                username,
                password: encryptedPassword,
                email,
                createdAt: new Date().getTime(),
                lastActive: new Date().getTime(),
            },
            { upsert: true }
        );

        // Fetch created user and generate auth token
        const user = await UserService.findOne({ email });

        const authToken = AuthService.generateToken({
            uid: userID,
            email,
            role: user.role,
        });

        await UserService.update({ email }, { lastActive: new Date(), authToken });
        user.authToken = authToken;

        return sendResponse(res, 200, { info: 'Signed up successfully', user });
    } catch (err) {
        console.error('Error during signup:', err);
        sendResponse(res, 500, {}, err);
    }
};

exports.getUsersList = async (req, res) => {
    try {
        const [users, total, pagination] = await Promise.all([
            UserModel.aggregate(AggregatorService.getUsersList(req.query)),
            UserModel.countDocuments(),
            AggregatorService.getPaginationData(req.query)
        ]);
        return sendResponse(res, 200, {
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            limit: pagination.limit,
            totalUsers: total,
            users,
        })
    } catch (error) {
        return sendResponse(res, 500, {}, error);
    }
};

exports.loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailExists = await UserModel.countDocuments({ email })
        if (emailExists === 0) {
            return res.status(400).json({
                status: 400,
                message: 'error',
                data: {
                    info: 'Email doesnot exists!'
                }
            })
        }

        if (!(email && password)) {
            return res.status(400).send(
                JSON.stringify({
                    status: 400,
                    message: 'error',
                    data: { info: 'All Inputs are required' }
                })
            )
        }

        const user = await UserService.findOne({ email });

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                status: 400,
                message: 'error',
                data: { info: 'Invalid Credentials' }
            })
        }

        const authToken = AuthService.generateToken({
            uid: user.uid,
            email,
            role: user.role
        })

        await UserModel.updateOne({ email }, { lastActive: new Date().getTime(), authToken })
        user.authToken = authToken
        res.json({
            status: 200,
            message: 'success',
            data: {
                info: 'Signed in successfully',
                user
            }
        })
    } catch (err) {
        sendResponse(res, 500, {}, err)
    }
}
