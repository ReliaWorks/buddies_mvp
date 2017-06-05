/* eslint-disable */
require('babel-polyfill');
const detox = require('detox');
const config = require('../package.json').detox;
var admin = require("firebase-admin");

var serviceAccount = require("../../activities-test-a3871-firebase-adminsdk-971yy-637a8a5c51");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://activities-test-a3871.firebaseio.com/"
});

before(async () => {
  await detox.init(config);
});

after(async () => {
  await detox.cleanup();
});
