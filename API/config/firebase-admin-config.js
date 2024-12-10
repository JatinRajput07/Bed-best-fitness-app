const admin = require('firebase-admin');
const path = require('path');

// Initialize the first app for partners
// const serviceAccountPartner = require(path.resolve(__dirname, './juggad-partner.json'));
// const partnerApp = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountPartner),
// }, 'partnerApp');

// Initialize the second app for users
const serviceAccountUser = require(path.resolve(__dirname, './serviceAccountKeyUser.json'));
const userApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountUser),
}, 'userApp');


exports = { userApp }