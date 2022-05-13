const BaseController = require("./baseCtrl.js")
const bcrypt = require('bcrypt')
const { PW_SALT_ROUND, JWT_SALT } = process.env
const jwt = require('jsonwebtoken')

class UserController extends BaseController {
  constructor(model, salt) {
    super(model, salt);
  }

  async createUser(req, res) {
    try {
      const { name, dob, address, description, email, password } = req.body;

      const hashedPass = bcrypt.hashSync(password, 8);

      const newUser = await this.model.create({
        name,
        dob,
        address,
        description,
        email,
        password: hashedPass,
      });

      if (!newUser) {
        throw Error;
      } else {
        const token = jwt.sign({}, this.salt, { expiresIn: "6h" });
        const result = {
          id: newUser._id,
          token,
          name,
          dob,
          address,
          description,
          email,
        };
        res.send(result);
      }
    } catch (err) {
      let msg;
      if (err.code == 11000) {
        msg = "Email already in use, pls try again";
      } else {
        msg = "Something went wrong with the sign-up, pls try again later";
      }
      this.errorHandler(err, msg, res);
    }
  }

}

module.exports = UserController