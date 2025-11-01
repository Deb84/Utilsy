import dotenv from 'dotenv'
dotenv.config()

const env: Environment = {
    APPID: process.env.APPID!,
    AUTH: process.env.AUTH!
}

export default env