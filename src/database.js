import mongoose from 'mongoose';
import {configObject} from './config/config.js';
const {mongoUrl} = configObject;

class Database {
    static #instance

    constructor() {
        mongoose.connect(mongoUrl)
            .then(() => {
                console.log('Successfully connected to the database');
            }).catch(err => console.log(err));

    }

    static getInstance() {
        if (!Database.#instance) {
            console.log('Creating instance');
            Database.#instance = new Database();
        }
        return Database.#instance;
    }
}

Database.getInstance()