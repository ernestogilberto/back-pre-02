import express from 'express';
import {create} from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import {initializePassport} from './passport.config.js';
import passport from 'passport';
import {config} from './config.js';
import {__dirname} from '../utils/dirname-path.js'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './swagger.config.js';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerUi from 'swagger-ui-express';

const {mongoUrl, cookieSecret, sessionSecret, ttl} = config;

const app = express();
const specs = swaggerJsdoc(swaggerConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser( cookieSecret));
app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl,
        ttl})
}));

app.use('/api-docs', swaggerUiExpress.serve, swaggerUi.setup(specs));

const hbs = create({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',

    helpers: {
        toFixed: (value, precision) => value.toFixed(precision)
    }
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

export default app;