import express from 'express';
import mongoose from 'mongoose';
import {create} from 'express-handlebars'
import {Server} from 'socket.io'
import {router as productsRouter} from './routes/products.router.js'
import {router as cartsRouter} from './routes/carts.router.js'
import {router as viewsRouter} from './routes/views.router.js'
import {__dirname} from './utils.js'

import {ProductsManager} from './managers/productsManager.js';
import {MessagesManager} from './managers/messagesManager.js';

const manager = new ProductsManager();
const messagesManager = new MessagesManager();

const PORT = 8080;
const LOCAL = 'http://127.0.0.1:' + PORT;

const app = express();
app.use(express.static('public'));
const httpServer =app.listen(PORT, () => console.log(`Server running on ${LOCAL}`));

mongoose.connect('mongodb+srv://ernestogilberto:coderhouse@cluster0.gnfbmpg.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
      console.log('Successfully connected to the database');
  }).catch(err => console.log(err));

mongoose.set('strictQuery', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

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


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
// app.use('/api/chat', chatRouter)
app.use('/', viewsRouter)

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