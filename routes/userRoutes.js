const express = require('express');

const router = express.Router();

class TaskRouter {
  constructor(controller) {
    this.controller = controller
  }

  router() {
    router.post("/createUser", this.controller.createUser.bind(this.controller))
    router.get("/getUser/:id", this.controller.getUser.bind(this.controller))
    // router.put("/updateUser", this.controller.updateUser.bind(this.controller))
    return router
  }

  // userRouters.post("/createUser", controller.createUser.bind(controller));

  // userRouters.put("/name", controller.updateName.bind(controller));

  // return userRouters;
}

module.exports = TaskRouter