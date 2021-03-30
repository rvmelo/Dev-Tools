"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

var _User = _interopRequireDefault(require("../models/User"));

var _auth = _interopRequireDefault(require("../config/auth"));

var _appError = _interopRequireDefault(require("../errors/appError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthenticateUserService {
  async execute({
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getRepository)(_User.default);
    const user = await usersRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new _appError.default('wrong user/password combinations');
    }

    const passwordMatched = await (0, _bcrypt.compare)(password, user.password);
    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: user.id,
      expiresIn
    });

    if (!passwordMatched) {
      throw new _appError.default(' wrong user/password combination');
    }

    return {
      user: (0, _classTransformer.classToClass)(user),
      token
    };
  }

}

var _default = AuthenticateUserService;
exports.default = _default;