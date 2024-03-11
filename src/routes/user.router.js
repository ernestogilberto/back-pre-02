import express from 'express';
const router = express.Router();
import { UserModel } from '../managers/models/user.model.js';

router.get('/', async (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const { first_name, last_name, email, password, age, } = req.body;
    try {
        const user = { first_name, last_name, email, password, age};
        const newUser = await UserModel.create(user);
        res.status(201).render('registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

export {router};