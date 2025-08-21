const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log("jwt error", err);
        return res.status(401).json({ message: "unauthorised" });
      } else {
        console.log("Token verified", data);
        console.log(token);
        req.currentUser = data;
        next();
      }
    });
  } else {
    console.log("no token found");
    res.status(401).send("unauthorised");
  }
};
module.exports = authenticate;
