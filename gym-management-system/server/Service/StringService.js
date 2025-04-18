// services/StringService.js
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const UserModel = require('../Models/User');
const ConstantService = require('./ConstantsService');

class StringService {
    static generateRandomPassword(passwordLength = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }

    static async getEncryptedPassword(password) {
        const encryptedPassword = await bcrypt.hash(password, 10)
        return encryptedPassword
    }

    static async generateUserId() {
        return crypto.randomUUID()
    }

    static capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    static camelCaseToSnakeCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    static generateUniqueIdentifier(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let identifier = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            identifier += characters[randomIndex];
        }
        return identifier;
    }

    // Helper function to generate unique referral code
    static generateUniqueReferralCode = async () => {
        let referralCode
        let isUnique = false

        while (!isUnique) {
            referralCode = this.generateRandomCode()
            const codeExists = await UserModel.exists({ referralCode })
            if (!codeExists) {
                isUnique = true
            }
        }
        return referralCode
    }

    static generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    static isOtpExpired = (createdAt) => new Date().getTime() - createdAt > ConstantService.OTP_EXPIRY_DURATION

    static generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
}

module.exports = StringService;
