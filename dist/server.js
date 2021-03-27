"use strict";

require("reflect-metadata");

require("./database");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _appError = _interopRequireDefault(require("./errors/appError"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((error, req, res, next) => {
  if (error instanceof _appError.default) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message
    });
  }

  return res.status(500).json({
    status: 'Error',
    message: 'Internal server error'
  });
});
app.listen(process.env.PORT || 3000, () => console.log('server started on port 3000'));