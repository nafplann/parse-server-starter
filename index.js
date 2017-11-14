const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const fs = require('fs');
const port = 1337;

const options = {};

const api = new ParseServer({
    appName: 'APP_NAME',
    databaseURI: 'mongodb://localhost:27017/parse',
    appId: 'APP_ID',
    masterKey: 'APP_MASTER_KEY',
    serverURL: 'http://35.201.174.123:1337/parse',
    cloud: __dirname + '/cloud/main.js'
});

app.use('/parse', api);

const httpServer = require('http').createServer(app);

httpServer.listen(port, () => {
    console.log('parse-server-starter is running on port ', port);
});
