const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const bearController = require('./bears/bearController'); //pull in our Routes as controller

const server = express();

server.use(helmet());  //This adds a layer of security to API
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);  // this is where we register our routes.  EVERYTHING on that bearController will link up to the address of 'api/bears'

const port = process.env.PORT || 5000;


mongoose.Promise = global.Promise; //configure the mongoose promise system to use Native JS Promises
mongoose.connect('mongodb://localhost/beardb', {}, err =>{
//declare where we're going to connect this is the equivalent of using 'use dbBears' in the mongo shell
if (err) console.log("Database connection failed");
console.log('Successfully Connected to MongoDB');
});





server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
