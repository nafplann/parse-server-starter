const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const app = express();
const port = 1337;
const ipAddress = '127.0.0.1';
const dbName = 'parse';
const appName = 'parse';

const api = new ParseServer({
  appName: 'APP_NAME',
  databaseURI: `postgres://postgres:1q2w3e4r5@localhost:5432/${dbName}?ssl=false&application_name=${appName}`,
  appId: 'APP_ID',
  masterKey: 'APP_MASTER_KEY',
  serverURL: `http://${ipAddress}:${port}/dbs/${dbName}`,
  cloud: __dirname + '/cloud/main.js'
});

const dashboard = new ParseDashboard({
  apps: [
    {
      'serverURL': `http://${ipAddress}:${port}/dbs/${dbName}`,
      'appId': 'APP_ID',
      'masterKey': 'APP_MASTER_KEY',
      'appName': 'APP_NAME',
      'iconName': 'icon.jpg'
    }
  ],
  users: [
    { 'user': 'user', 'pass': 'pass' }
  ],
  iconsFolder: 'icons'
}, true);

app.use(`/dbs/${dbName}`, api);
app.use(`/`, dashboard);

const httpServer = require('http').createServer(app);

httpServer.listen(port, () => {
  console.log(`parse-server-starter is running on ${ipAddress}:${port}`);
});
