import dotenv from 'dotenv';
import {program} from '../utils/commander.js';

const {mode = 'development'} = program.opts();

dotenv.config({
    path: `./.env.${mode}`
});

const config = {
    port: process.env.PORT,
    local: process.env.LOCAL,
    cookieSecret: process.env.COOKIE_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    mongoUrl: process.env.MONGO_URL,
    ttl: process.env.TTL
}

export {config}