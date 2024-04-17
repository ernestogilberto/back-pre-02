import dotenv from 'dotenv';
import {program} from '../utils/commander.js';

const {mode} = program.opts();

dotenv.config({
    path: `./.env.${mode}`
});

const configObject = {
    port: process.env.PORT,
    local: process.env.LOCAL,
    cookie_secret: process.env.COOKIE_SECRET,
    session_secret: process.env.SESSION_SECRET,
    mongoUrl: process.env.MONGO_URL,
    ttl: process.env.TTL
}

export {configObject}