import {Server} from 'socket.io'
import ProductsController from '../controllers/products.controller.js';
import MessagesController from '../controllers/messages.controller.js';

const controller = new ProductsController();
const messagesController = new MessagesController();

const configureSocketIO = (httpServer) => {
    const socketServer = new Server(httpServer)

    socketServer.on('connection', (socket) => {
        console.log('New client connected')
        socket.on('new-product', async (data) => {
            await controller.addProduct(data)
            const {payload: products} = await controller.getProducts()
            socketServer.emit('products', products)
        })
        socket.on('delete-product', async (id) => {
            await controller.deleteById(id)
            const {payload: products} = await controller.getProducts()
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
}

export default configureSocketIO;