const jwt = require("jsonwebtoken");

const generateToken = (id,role) => {
  return jwt.sign({ userId: id, userRole: role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = generateToken;