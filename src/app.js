import express from 'express';
import mongoose from 'mongoose';
import {create} from 'express-handlebars'
import {Server} from 'socket.io'
import {router as productsRouter} from './routes/products.router.js'
import {router as cartsRouter} from './routes/carts.router.js'
import {router as viewsRouter} from './routes/views.router.js'
import {router as sessionsRouter} from './routes/sessions.router.js'
import {router as usersRouter} from './routes/user.router.js'
import {__dirname} from './dirname-path.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import './database.js'

import {ProductsManager} from './managers/productsManager.js';
import {MessagesManager} from './managers/messagesManager.js';
import {initializePassport} from './config/passport.config.js';
import passport from 'passport';
import {configObject} from './config/config.js';

const {mongoUrl, cookie_secret, local, session_secret, ttl, port} = configObject;

const manager = new ProductsManager();
const messagesManager = new MessagesManager();

const app = express();
app.use(express.static('public'));
const httpServer =app.listen(port, () => console.log(`Server running on ${local+port}`));

mongoose.connect(mongoUrl)
  .then(() => {
      console.log('Successfully connected to the database');
  }).catch(err => console.log(err));

mongoose.set('strictQuery', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser( cookie_secret));
app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true,
    // store: new FileStoreSession({path: './src/sessions', ttl: 100, retries: 1})
    store: MongoStore.create({
        mongoUrl,
        ttl})
}));

const hbs = create({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',

    helpers: {
        toFixed: (value, precision) => {
            return value.toFixed(precision)
        }
    }
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)
app.use('/cart', cartsRouter)
// app.use('/api/chat', chatRouter)
app.use('/', viewsRouter)
app.use('/api/user', usersRouter)
app.use('/api/sessions', sessionsRouter)

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log('New client connected')
    socket.on('new-product', async (data) => {
        await manager.addProduct(data)
        const {payload: products} = await manager.getProducts()
        socketServer.emit('products', products)
    })
    socket.on('delete-product', async (id) => {
        await manager.deleteById(id)
        const {payload: products} = await manager.getProducts()
        socketServer.emit('products', products)
    })
    socket.on('newUser', async (data) => {
        let messages = []
        await messagesManager.getAll().then(res => {
            messages = res.payload
        })
        socket.emit('history', messages);
        socket.broadcast.emit('alert', data);
    })
    socket.on('chat message', async data => {
        let date = new Date();
        let currentDate = `${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        await messagesManager.save({userId: data.user, message: data.message, date: currentDate})
        let messages = []
        await messagesManager.getAll().then(res => {
            messages = res.payload
        })
        socketServer.emit('history', messages);
    })
})