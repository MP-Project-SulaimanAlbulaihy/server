const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, mobile, password } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!((mobile || username) && password)) {
    res.status(200).json({ msg: "Kindly fill all inputs" });
  } else {
    userModel
      .findOne({ $or: [{ username }, { mobile }] })
      .then(async (result) => {
        if (result) {
          if (mobile === result.mobile || username === result.username) {
            const payload = {
              id: result._id,
              role: result.role,
            };
            const options = {
              expiresIn: "30m",
            };
            const token = jwt.sign(payload, SECRET_KEY, options);
            const unhashPassword = await bcrypt.compare(
              password,
              result.password
            );
            if (unhashPassword) {
              res.status(200).json({ result, token });
            } else {
              res.status(200).json("invalid username/mobile or password");
            }
          } else {
            res.status(200).json("invalid username/mobile or password");
          }
        } else {
          res.status(200).json("Username or Mobile does not exist");
        }
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  }
};

const register = (req, res) => {
  const { username, mobile, password, location } = req.body;
  let errors = [];

  userModel.findOne({ $or: [{ username }, { mobile }] }).then(async (user) => {
    if (user) {
      errors.push({ msg: "Mobile number or Username already registered" });
      res.status(200).json(errors);
    } else {
      if (!(username && mobile && password && location)) {
        errors.push({ msg: "Kindly fill all inputs" });
      }
      if (password?.length < 8) {
        errors.push({ msg: "Password must be at least 8 characters" });
      }
      if (!password?.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g)) {
        errors.push({
          msg: "Password must contain at least one number and one lower and uppercase letters",
        });
      }

      if (errors.length > 0) {
        res.status(200).json(errors);
      } else {
        const SALT = Number(process.env.SALT);
        const hashedPassword = await bcrypt.hash(password, SALT);
        const newUser = new userModel({
          username,
          mobile,
          location,
          password: hashedPassword,
        });

        newUser
          .save()
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            res.status(200).json(err);
          });
      }
    }
  });
};

const logout = (req, res) => {};

module.exports = { register, login, logout };
