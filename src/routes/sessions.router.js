import express from 'express';
import {UserModel} from '../managers/models/user.model.js';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if (user && user.password === password) {
            req.session.login = true;
            req.session.user = user;
            res.status(200).redirect('/');
        } else {
            res.status(401).send({error: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(401).send({error: 'Invalid credentials'});
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send({error: 'Error logging out'});
        } else {
            res.status(200).redirect('/api/session/login');
        }
    });
});

export {router};