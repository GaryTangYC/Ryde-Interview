const mongoose = require("mongoose");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// Common password of 123 for seeding into DB
const hash = bcrypt.hashSync("123", 8);

const dotenv = require("dotenv");
dotenv.config();
const { DATABASE_URL } = process.env;
/* 
1. Mongoose connection required here as this file runs independently of index.js in root folder where connection is defined 
2. placed a seed script in package.json so just need to [npm run seed] to run this file
*/
async function seedDB() {

  mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("successfully connected to mongodb!!"))
    .catch((err) => console.error("error in connecting to mongodb!!", err));

  //////////////////////////////////////////////////////////////////
  /* SEED USERS */
  //////////////////////////////////////////////////////////////////
  const userSeeds = [
    {
      _id: "507f1f77bcf86cd799439011",
      name: "Timmy",
      dob: "1988-03-18",
      address: "Timmy address @ Singapore",
      description: "Timmy is a happy user",
      email: "timmy@gmail.com",
      password: hash,
    },
    {
      _id: "507f1f77bcf86cd799439012",
      name: "Gary",
      dob: "1945-05-29",
      address: "Gary address @ Malaysia",
      description: "Gary is a fun user",
      email: "gary@gmail.com",
      password: hash,
    },
  ];
  console.log('userseeds:', userSeeds)

  /* 
  1. deleteMany to delete all prev records  before seeding 
  2. async / await function require or file will not be run as connection will be closed prior to seeding  
  */
  // await User.deleteMany({});
  await User.insertMany(userSeeds);

  /* close the connection otherwise terminal will be left hanging w an open mongodb connection */
  console.log("reached end of seed file");
  await mongoose.connection.close();

}

seedDB();