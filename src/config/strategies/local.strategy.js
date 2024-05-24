import {Strategy as LocalStrategy} from 'passport-local';
import {UserModel} from '../../models/user.model.js'
import {CartsModel} from '../../models/carts.model.js';
import {hashPassword, comparePassword} from '../../utils/hashbcrypt.js';
import passport from 'passport';

const localStrategy = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email', passwordField: 'password'
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age, role} = req.body;
        try {
            const cart = await CartsModel();
            await cart.save();

            const filter = {email};
            const update = {first_name, last_name, role, password: await hashPassword(password),  age, cart: cart._id};

            const user = await UserModel.findOneAndUpdate(filter, update, {new: true, upsert: true});

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email', passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await UserModel.findOne({email}).select('password');

            if (!user) {
                return done(null, false, {message: 'Invalid username'});
            }

            if (!await comparePassword(password, user.password)) {
                return done(null, false, {message: 'Invalid password'});
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
}

export default localStrategy;