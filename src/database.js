import mongoose from 'mongoose';
import {configObject} from './config/config.js';
const {mongoUrl} = configObject;

mongoose.connect(mongoUrl)
  .then(() => {
      console.log('Successfully connected to the database');
  }).catch(err => console.log(err));

