import {Strategy as GitHubStrategy} from 'passport-github2';
import {UserModel} from '../../models/user.model.js'
import {hashPassword} from '../../utils/hashbcrypt.js';
import passport from 'passport';

const githubStrategy = () => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.bba31a28974eaa31', //process.env.GITHUB_CLIENT_ID,
        clientSecret: '3ee865ee19a2d311e0b6bc013239d83d4536c10e', //process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',//process.env.GITHUB_CALLBACK_URL
        scope: ['user:email'] //process.env.GITHUB_SCOPE,
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            const filter = {email: profile._json.email};
            const update = {first_name: profile._json.name, last_name: ' ', email: profile._json.email, password: await hashPassword('1234'), age: 18};

            const user = await UserModel.findOneAndUpdate(filter, update, {new: true, upsert: true});
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }));
}

export default githubStrategy;