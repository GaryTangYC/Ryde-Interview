class BaseController {
  constructor(model, salt) {
    this.model = model;
    this.salt = salt
  }
  /* Error log */
  errorHandler = (err, msg, res) => {
    console.error("\x1b[41m%s\x1b[0m", "Error in baseCtrl");
    console.error("\x1b[31m%s\x1b[0m", err)
    res.send({ err: msg });
  };
}

module.exports = BaseController