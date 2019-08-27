'use strict'
var constants = require('./utils/Constants.js')
const userApp = require('./Api/UserApp')
const express = require('express')

// App
const app = express();

app.use('/users', userApp)

app.listen(constants.PORT, constants.HOST);
console.log(`Running on http://${constants.HOST}:${constants.PORT}`);
