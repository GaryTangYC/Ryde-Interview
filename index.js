const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const { DATABASE_URL, PORT, SALT } = process.env

const app = express();

app.use(express.json()); // handle json from axios post requests

// Connect to Mongoose DB
mongoose.connect(DATABASE_URL).then(() => console.log("successfully connected to mongodb")).catch((err) => {
  console.error("error connecting to mongodb")
  console.error(err);
});

// Import Models
const User = require('./models/User.js')

// Import Routes & Controllers
const UserRouter = require('./routes/userRoutes.js')
const UserController = require('./controllers/userCtrl.js')

// import middlewares
const verifyToken = require('./middlewares/auth.js')

// Create instance of controllers and pass in models and SALT for JWT verification
const userControl = new UserController(User, SALT);

// Define routes
app.use("/user", new UserRouter(userControl).router());


// Express app configuration to localhost:3004
app.listen(PORT || 3004, () => {
  console.log(`bckend server is running on ${3004}`);
});