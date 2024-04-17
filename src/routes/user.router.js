import express from 'express';
const router = express.Router();
import { UserModel } from '../models/user.model.js';
import {hashPassword} from '../utils/hashbcrypt.js';
import passport from 'passport';

router.get('/', async (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    passport.authenticate('register', {failureRedirect: '/api/user/failureRegister'} ,(err, user, info) => {
        if (err) {
            return res.status(500).send({error: err});
        } else if (!user) {
            return res.status(400).send({error: info.message});
        } else {
            req.login(user, async () => {
                res.status(200).redirect('/api/sessions/login');
            });
        }
    })(req, res);
});

router.get('/api/user/failureRegister', (req, res) => {
    res.status(400).send({error: 'User already exists'});
});

export {router};