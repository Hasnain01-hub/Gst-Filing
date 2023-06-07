const { admin, db, auth, storage } = require("../config/firebase.config");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, role } = req.body;

  const jwt_token = jwt.sign(
    {
      email: email,
      role: role,
    },
    "zd2WQIQkw1WuoTlIkrVuhiaFSO/cQH+/rD9Q6Oy8Xtc=",
    {
      expiresIn: "24h",
    }
  );
  res.json(jwt_token);
};
exports.register = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  db.collection("users")
    .doc(email)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        res.status(400).json({ message: "User already exists" });
      } else {
        try {
          const user = await admin.auth().createUser({
            email: email,
            password: password,
          });

          let users_data = {
            email: email,

            role: "user",
          };
          db.collection("users").doc(email).set(users_data);
          const jwt_token = jwt.sign(
            {
              email: email,
              role: "user",
            },
            "zd2WQIQkw1WuoTlIkrVuhiaFSO/cQH+/rD9Q6Oy8Xtc=",
            {
              expiresIn: "24h",
            }
          );
          res.json(jwt_token);
        } catch (error) {
          console.log(error);
          res.status(400).json({ message: error.message });
        }
      }
    });
};

exports.getUsers = async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({
      message: "Invalid user id!",
      success: false,
    });
  }
};
