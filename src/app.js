import expressApp from './config/express.config.js';
import configureSocketIO from './config/socket.config.js';
import {productsRouter, cartsRouter, sessionsRouter, usersRouter, viewsRouter, checkoutsRouter} from './routes/index.js'
import {configObject} from './config/config.js';
import './database.js';

const {local, port} = configObject;
const httpServer = expressApp.listen(port, () => console.log(`Server running on ${local+port}`));

expressApp.use("/api/products", productsRouter)
expressApp.use("/api/sessions", sessionsRouter)
expressApp.use("/api/checkout", checkoutsRouter)
expressApp.use("/api/cart", cartsRouter)
expressApp.use("/api/user", usersRouter)
expressApp.use("/cart", cartsRouter)
expressApp.use("/", viewsRouter)

configureSocketIO(httpServer);