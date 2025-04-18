require('dotenv').config()

const APP_DATA = {
    NAME: process.env.PROJECT_NAME || 'Project Name',
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY || '',
    MONGODB_URL: process.env.MONGODB_URL || ''
}

exports.APP_DATA = APP_DATA
