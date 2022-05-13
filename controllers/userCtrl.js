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
      console.log('req.body:', req.body)
      const { name, dob, address, description, email, password } = req.body;
      console.log("name is:", name)

      const convertDob = new Date(dob)

      const hashedPass = bcrypt.hashSync(password, 8);

      const newUser = await this.model.create({
        name,
        dob: convertDob,
        address,
        description,
        email, // For authentication challenge
        password: hashedPass, // For authentication challenge
      });

      // if (!newUser) {
      //   throw Error;
      // } else {
      //   const token = jwt.sign({}, this.salt, { expiresIn: "6h" });
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
      // }
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

  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await this.model
        .findById({ _id: id })
        .exec();
      console.log('user', user)
      res.send(user);
    } catch (err) {
      let msg = "Error querying user. Please try again";
      this.errorHandler(err, msg, res);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.body;
    try {
      const user = await this.model.deleteOne({ _id: id })
      const successMsg = `Deleted userId: ${id}`
      res.send(succcessMsg)
    } catch (err) {
      const msg = "Deletion error, please try again";
      this.errorHandler(err, msg, res)
    }
  }

  // For simplicity on update, I have group all updates in a singular function rather than split function
  async updateUser(req, res) {
    const { id, name, dob, address, description, email, password } = req.body;

    try {
      const updateData = await this.model.findOneAndUpdate(
        { _id: id },
        { name, dob, description, email },
        { new: true }
      );
      res.send(updateData);
    } catch (err) {
      const msg =
        "Something went wrong with the update, pls login and try again";
      this.errorHandler(err, msg, res);
    }
  }

}

module.exports = UserController