const Auth = require("../model/token");
async function AuthValidator(req, res, next) {
  let authBearer = req.headers["Authorization"];
  if (!authBearer)
    return res
      .status(403)
      .send({ status: "error", message: "Auth token not found" });

  let authorization = authBearer.replace("Bearer ", "");
  if (!authorization)
    return res
      .status(403)
      .send({ status: "error", message: "Unauthorized user" });

  await Auth.verifyToken(authorization)
    .then((decodedToken) => {
      req.user_id = decodedToken._id;
    })
    .catch((err) => {
      return res.status(403).send({ status: "error", message: err.message });
    });

  next();
}

module.exports = {
  AuthValidator,
};
