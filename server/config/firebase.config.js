var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();
var auth = admin.auth();
var storage = admin.storage();
module.exports = {
  db: db,
  auth: auth,
  storage: storage,
  admin,
};
