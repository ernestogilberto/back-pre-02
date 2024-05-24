import mongoose from 'mongoose';
import {config} from './config.js';
const {mongoUrl} = config;

class DatabaseConfig {
    static #instance

    constructor() {
        mongoose.connect(mongoUrl)
            .then(() => {
                console.log('Successfully connected to the database');
            }).catch(err => console.log(err));

    }

    static getInstance() {
        if (!DatabaseConfig.#instance) {
            console.log('Creating instance');
            DatabaseConfig.#instance = new DatabaseConfig();
        }
        return DatabaseConfig.#instance;
    }
}

DatabaseConfig.getInstance()