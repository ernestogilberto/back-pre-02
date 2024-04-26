import express from 'express';
import {create} from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import {initializePassport} from './passport.config.js';
import passport from 'passport';
import {configObject} from './config.js';
import {__dirname} from '../dirname-path.js'

const {mongoUrl, cookie_secret, session_secret, ttl} = configObject;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser( cookie_secret));
app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true,
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

export default app;