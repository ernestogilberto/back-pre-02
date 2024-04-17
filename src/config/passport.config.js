import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GitHubStrategy} from 'passport-github2';
import {UserModel} from '../managers/models/user.model.js'
import {CartsModel} from '../managers/models/carts.model.js';
import {hashPassword, comparePassword} from '../utils/hashbcrypt.js';


const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email', passwordField: 'password'
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age, role} = req.body;
        try {
            const existingUser = await UserModel.findOne({email});
            if (existingUser) {
                return done(null, false, {message: 'User already exists'});
            } else {
                const cart = new CartsModel();
                await cart.save();
                const user = await UserModel.create({first_name, last_name, email, role, password: await hashPassword(password), age, cart: cart._id});
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await UserModel.findOne({email});
            if (!user) {
                return done(null, false, {message: 'Invalid username'});
            } else if (!await comparePassword(password, user.password)) {
                return done(null, false, {message: 'Invalid password'});
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id);
        done(null, user);
    });




    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.bba31a28974eaa31", //process.env.GITHUB_CLIENT_ID,
        clientSecret: "3ee865ee19a2d311e0b6bc013239d83d4536c10e", //process.env.GITHUB_CLIENT_SECRET,
        callbackURL:  "http://localhost:8080/api/sessions/githubcallback",//process.env.GITHUB_CALLBACK_URL
        scope: ['user:email'] //process.env.GITHUB_SCOPE,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findOne({email: profile._json.email});
            if (!user) {
                const newUser = await UserModel.create({first_name: profile._json.name, last_name: ' ' , email: profile._json.email, password: await hashPassword('1234'), age: 18});
                return done(null, newUser);
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));
}

export {initializePassport};