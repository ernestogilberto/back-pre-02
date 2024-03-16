import express from 'express';
import {UserModel} from '../managers/models/user.model.js';
import {comparePassword} from '../utils/hashbcrypt.js';
import passport from 'passport';
import generateToken from '../utils/jsonwebtoken.js';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    passport.authenticate('login', {failureRedirect: '/api/sessions/failureLogin'}, (err, user, info) => {
        if (err) {
            return res.status(500).send({error: err});
        } else if (!user) {
            return res.status(400).send({error: info.message});
        } else {
            req.login(user, async () => {
                req.session.user = {email: user.email, first_name: user.first_name, last_name: user.last_name, age: user.age};
                res.status(200).redirect('/');
            });
        }
    })(req, res);

});

router.get('/github', passport.authenticate('github', {scope: ['user:email']}, (req, res) => {
    res.status(200).redirect('/');
}));

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/sessions/login'}), (req, res) => {
    req.session.user = {email: req.user.email, first_name: req.user.first_name, last_name: req.user.last_name, age: req.user.age};
    req.session.login = true;
    res.status(200).redirect('/');
});

router.post('jwt', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).send({error: 'User not found'});
        }
        const isPasswordValid = comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({error: 'Invalid credentials'});
        }
        const token = generateToken({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            id: user._id
        });
        res.status(200).send({token});
    } catch (e) {
        res.status(500).send({error: e});
    }
});



router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/');
});

router.get('/failureLogin', (req, res) => {
    res.status(400).send({error: 'Invalid credentials'});
});

export {router};