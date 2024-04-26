import express from 'express';
import passport from 'passport';

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
    res.render('register');
});

usersRouter.post('/', async (req, res) => {
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

usersRouter.get('/api/user/failureRegister', (req, res) => {
    res.status(400).send({error: 'User already exists'});
});

export {usersRouter};