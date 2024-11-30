import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.join((process.cwd(), '.env'))})

export default {
  port: process.env.PORT,
  mongoose_url: process.env.MONGO_URL,
  bcrypt_solr_round: process.env.BCRYPT_SOLT_ROUND,
  default_password: process.env.DEFAULT_PASS,
};