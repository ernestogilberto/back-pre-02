import expressApp from './config/express.config.js';
import configureSocketIO from './config/socket.config.js';
import {productsRouter, cartsRouter, sessionsRouter, usersRouter, viewsRouter, checkoutsRouter, mockingProductsRouter} from './routes/index.js'
import {config} from './config/config.js';
import './config/database.config.js';

const {local, port} = config;
const httpServer = expressApp.listen(port, () => console.log(`Server running on ${local+port}`));

expressApp.use("/mockingProducts", mockingProductsRouter)
expressApp.use("/api/products", productsRouter)
expressApp.use("/api/sessions", sessionsRouter)
expressApp.use("/api/checkout", checkoutsRouter)
expressApp.use("/api/carts", cartsRouter)
expressApp.use("/api/users", usersRouter)
expressApp.use("/cart", cartsRouter)
expressApp.use("/", viewsRouter)

configureSocketIO(httpServer);