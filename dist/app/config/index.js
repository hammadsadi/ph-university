"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    port: process.env.PORT,
    mongoose_url: process.env.MONGO_URL,
    bcrypt_solr_round: process.env.BCRYPT_SOLT_ROUND,
    default_password: process.env.DEFAULT_PASS,
    node_env: process.env.NODE_ENV,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_refresh_token: process.env.REFRESH_TOKEN,
    access_token_experies_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_experies_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    sm_pass: process.env.SM_PASS,
    client_base_url: process.env.CLIENT_BASE_URL,
    cloudinary_cloude_name: process.env.CLOUDINARY_CLOUDE_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
