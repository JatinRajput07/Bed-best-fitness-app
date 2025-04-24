const admin = require('firebase-admin');
const path = require('path');

// Initialize the first app for partners (host)
// const serviceAccountPartner = require(path.resolve(__dirname, './serviceAccountKeyUser.json'));

const firebaseConfig = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URL,
  token_uri: process.env.TOKEN_URL,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIL
}

const HostfirebaseConfig = {
  type: "service_account",
  project_id: process.env.HOST_PROJECT_ID,
  private_key_id: process.env.HOST_PRIVATE_KEY_ID,
  private_key: process.env.HOST_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.HOST_CLIENT_EMAIL,
  client_id: process.env.HOST_CLIENT_ID,
  auth_uri: process.env.HOST_AUTH_URL,
  token_uri: process.env.HOST_TOKEN_URL,
  auth_provider_x509_cert_url: process.env.HOST_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.HOST_CLIENT_X509_CERT_URL,
  universe_domain: process.env.HOST_UNIVERSE_DOMAIL
}


const partnerApp = admin.initializeApp({
  credential: admin.credential.cert(HostfirebaseConfig),
}, 'partnerApp');

// Initialize the second app for users
// const serviceAccountUser = require(path.resolve(__dirname, process.env.SERVICE_ACCOUNT_KEY_USER));
const userApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
}, 'userApp');

// Export both apps for external use
exports.userApp = userApp;
exports.partnerApp = partnerApp;
