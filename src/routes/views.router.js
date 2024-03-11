import express from 'express';
import {ProductsManager} from '../managers/productsManager.js'
import {MessagesManager} from '../managers/messagesManager.js';

const manager = new ProductsManager();
const messagesManager = new MessagesManager();

const router = express.Router();

// const auth = (req, res, next) => {
//     if (req.session.user === 'coder' && req.session.admin) {
//         next();
//     } else {
//         res.status(401).send('not authorized');
//         // res.redirect('/login');
//     }
// }

router.get('/', async (req, res) => {
    try {
        let {limit, query, sort, page} = req.query;
        let user = req.session.user;
        console.log(user)
        const products = await manager.getProducts({limit, query, sort, page});
        res.status(200).render('home', {products, user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.get('/realTimeProducts', async (req, res) => {
    try {
        const {payload, error} = await manager.getProducts();
        let products = await JSON.parse(JSON.stringify(payload));
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).render('realTimeProducts', {products: products});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.post('/realTimeProducts', async (req, res) => {
    try {
        const product = req.body;
        await manager.addProduct(product);
        const {payload, error} = await manager.getProducts();
        let products = await JSON.parse(JSON.stringify(payload));
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).render( 'realTImeProducts' , {products: products});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.delete('/realTimeProducts/:pid', async (req, res) => {
    try {
        // let id = parseInt(req.params.pid);
        let id = req.params.pid;
        console.log('id', id)
        const {payload: deletedProduct, error} = await manager.deleteById(id);
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).send(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.get('/chat', async(req, res) => {

    const {payload, error} = await messagesManager.getAll();
    const messages = await JSON.parse(JSON.stringify(payload));
    res.render('chat', {messages})
})

router.post('/chat', (req, res) => {
    const message = req.body;
    console.log(messagesManager.save(message));
    res.redirect('/chat');
})

// router.get('/setcookie', (req, res) => {
//     res.cookie('coderCookie', 'coderhouse', {maxAge: 60000, signed: true});
//     res.send('cookie set');
// })
//
// router.get('/getcookie', (req, res) => {
//     const cookie = req.signedCookies.coderCookie;
//     if (cookie) {
//         res.send(cookie);
//     } else {
//         res.send('no cookie');
//     }
// })
//
// router.get('/login', (req, res) => {
//     const {user, password} = req.query;
//     if (user === 'coder' && password === 'house') {
//         req.session.user = user;
//         req.session.admin = true;
//         res.send('session started');
//     } else {
//         res.send('no user or password');
//     }
// })
//
// router.get('/admin', auth,  (req, res) => {
//     res.send('Admin page');
// })
//
// router.get('/logout', (req, res) => {
//     res.clearCookie('coderCookie');
//     req.session.destroy(
//         err => {
//             if (!err) res.send('session terminated');
//             else res.send(err);
//         }
//     );
// })
//
// router.get('/session', (req, res) => {
//     if (req.session.counter) {
//         req.session.counter++;
//         res.send('counter: ' + req.session.counter);
//     } else {
//         req.session.counter = 1;
//         res.send('First view');
//     }
// })

export {router}