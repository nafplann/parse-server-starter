const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const fs = require('fs');
const port = 1337;
const os = require( 'os' );
const networkInterfaces = os.networkInterfaces();
const ipAddress = networkInterfaces['eth0'][0]['address'];
const dbName = 'parse';

const api = new ParseServer({
    appName: 'APP_NAME',
    databaseURI: `mongodb://localhost:27017/${dbName}`,
    appId: 'APP_ID',
    masterKey: 'APP_MASTER_KEY',
    serverURL: `http://${ipAddress}:1337/${dbName}`
    cloud: __dirname + '/cloud/main.js'
});

app.use(`/${dbName}`, api);

const httpServer = require('http').createServer(app);

httpServer.listen(port, () => {
    console.log('parse-server-starter is running on port ', port);
});
