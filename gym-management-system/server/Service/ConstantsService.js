class ConstantService {
    static USER_ROLES = {
        ADMIN: 'admin',
        USER: 'user',
        MODERATOR: 'moderator'
    };

    static USER_ROLES_LIST = Object.values(ConstantService.USER_ROLES);

    // Application Statuses
    static STATUS = {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        PENDING: 'pending',
        DELETED: 'deleted'
    };

    static STATUS_LIST = Object.values(ConstantService.STATUS);

    // Error Messages
    static ERROR_MESSAGES = {
        NOT_FOUND: 'Resource not found',
        INVALID_INPUT: 'Invalid input',
        FORBIDDEN: 'You do not have permission to perform this action',
        UNAUTHORIZED: 'You must be logged in to perform this action',
        SERVER_ERROR: 'An unexpected error occurred on the server'
    };

    static CONFIG = {
        MAX_LOGIN_ATTEMPTS: 5,
        PASSWORD_RESET_TOKEN_EXPIRY: 3600,
        JWT_EXPIRY: '1d',
        SUPPORT_EMAIL: 'support@example.com',
        DEFAULT_PAGE_SIZE: 20
    };

    // Other Constants
    static CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD'];
    static COUNTRIES = ['US', 'CA', 'GB', 'AU', 'FR', 'DE'];
    static SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'es'];
    static DATE_FORMAT = 'YYYY-MM-DD';

    static OTP_EXPIRY_DURATION = 60 * 60 * 1000
    static JWT_EXPIRY_DAY_STRING = '180d'

    // Environment-Specific Configurations
    static ENV = {
        DEVELOPMENT: 'development',
        PRODUCTION: 'production',
        TEST: 'test'
    };

    static isProduction() {
        return process.env.NODE_ENV === ConstantService.ENV.PRODUCTION;
    }

    static isDevelopment() {
        return process.env.NODE_ENV === ConstantService.ENV.DEVELOPMENT;
    }

    static COMMON_ASSETS = {
        BOY_AVATAR: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/212884_569155.webp',
        FIRE_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/230050566_600684531.png',
        PASSWORD_RESET_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/597742728_208856788.png',
        WELCOME_BANNER: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/18262372_325330784.png',
        OTP_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/320104527_242998628.png',
        ADMIN_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/411300114_141991591.png',
        ANALYSIS_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/863723558_758183404.png',
        BOY_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/868175389_347683092.png',
        CALENDAR_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/78351488_961918568.png',
        COINS_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/220114177_76631009.png',
        DAY_AND_NIGHT_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/95790838_753600206.png',
        DELETE_BIN: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/502111661_349850340.png',
        DEVELOPER_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/528677734_674023214.png',
        GRADUATE_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/322985447_849473297.png',
        GROWTH_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/567122577_500370229.png',
        IT_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/224073200_963216879.png',
        TIMER_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/472044706_444674628.png',
        MAGIC_WAND_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/535084768_468464663.png',
        ADMIN_ICON_2: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/535553763_419020081.png',
        MONEY_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/138003129_905743691.png',
        PAPER_PLANE_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/705067264_244069309.png',
        PRIVACY_POLICY_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/781144265_422431665.png',
        QUIZ_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/645778996_92886448.png',
        QUIZ_ICON_2: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/349178245_355603800.png',
        MONEY_BAG_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/237612358_889019276.png',
        SCHOOL_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/274814401_313218526.png',
        SMILE_EMOJI_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/59500776_38387158.png',
        SETTING_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/73818616_507844504.png',
        SURPRISED_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/270111715_174272219.png',
        SWEAT_EMOJI_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/156429025_297006520.png',
        TARGET_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/260700990_876143394.png',
        TIMER_ICON_2: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/931981410_136568048.png',
        CLOUD_ICON: 'https://common-icons.s3.ap-south-1.amazonaws.com/attachments/tickets/137639433_740809468.png'
    }

    static COMMON_URLS = {
        JSON_PLACEHOLDER_USERS: 'https://jsonplaceholder.typicode.com/users',
        REQRES_USERS: 'https://reqres.in/api/users?per_page=12',
        RANDOM_DOG_IMAGE: 'https://dog.ceo/api/breeds/image/random',
        RANDOM_CAT_IMAGE: 'https://api.thecatapi.com/v1/images/search',
        FAKER_API_BOOKS: 'https://fakerapi.it/api/v1/books',
        RANDOM_USER: 'https://randomuser.me/api',
        PICSUM_PHOTO: 'https://picsum.photos/600/350',
        DUMMY_JSON_PRODUCTS: 'https://dummyjson.com/products',
        DUMMY_JSON_USERS: 'https://dummyjson.com/users'
    }

    static MAIL_TEMPLATES = {
        FORGOT_PASSWORD: 'forgot_password',
        WELCOME_USER: 'welcome_user',
        SIGNUP_OTP: 'signup_otp'
    }
}

module.exports = ConstantService;
