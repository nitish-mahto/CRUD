const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
// const auth = require("../../model/auth");

const Auth = require("../../model/token");

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

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/userDetails", AuthValidator, userController.userDetails);

module.exports = router;

// router.get('/me', auth, async (req, res) => {
//     console.log('Cookies: ', req.cookies)
//     try {
//         res.render('me', {name: user.name})
//     } catch (error) {
//         res.status(500).send()
//     }
// })
