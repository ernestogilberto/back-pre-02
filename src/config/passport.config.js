import passport from 'passport';
import localStrategy from './strategies/local.strategy.js';
import githubStrategy from './strategies/github.strategy.js';
import {UserModel} from '../models/user.model.js';

const initializePassport = () => {

    localStrategy();
    githubStrategy();

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id).lean();
            done(null, user);
        } catch (e) {
            done(e);
        }
    });
}

export {initializePassport};