const jwt = require("jsonwebtoken");

const { db } = require("../config/firebase.config");

exports.verifyuser = async (req, res, next) => {
  const authHeader = req.headers.authtoken;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader;

    jwt.verify(
      token,
      "zd2WQIQkw1WuoTlIkrVuhiaFSO/cQH+/rD9Q6Oy8Xtc=",
      async (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }

        //   const userData = await User.findOne({ _id: user._id });
        const userData = await db.collection("users").doc(user.email).get();
        console.log(userData);
        if (!userData) {
          return res.status(403).json("User not found!");
        }
        req.user = userData;
        next();
      }
    );
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
