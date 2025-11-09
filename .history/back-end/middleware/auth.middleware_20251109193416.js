const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  //when using session storage to store token and not cookie
  // const authHeader = req.headers.authorization;
  // console.log("Auth header:", req.headers.authorization);
  // if (authHeader && authHeader.startsWith("Bearer")) {
  //   const token = authHeader.split(" ")[1];
  //   jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
  //     if (err) {
  //       console.log("jwt error", err);
  //       return res.status(401).json({ message: "unauthorised" });
  //     } else {
  //       console.log("Token verified", data);
  //       console.log(token);
  //       req.currentUser = data;
  //       next();
  //     }
  //   });
  // } else {
  //   console.log("no token found");
  //   res.status(401).send("unauthorised");
  // }

  const token = req.cookies.authToken;
  if (!token) {
    console.log("no token found in cookie");
    return res.status(401).json({ message: "unauthorised" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log("jwt error", err);
      return res.status(401).json({ message: "unauthorised" });
    } else {
      // console.log("token verified", data);
      req.currentUser = data;
      next();
    }
  });
};
module.exports = authenticate;
