"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _bcrypt = require("bcrypt");

var _classTransformer = require("class-transformer");

var _User = _interopRequireDefault(require("../models/User"));

var _appError = _interopRequireDefault(require("../errors/appError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateUserService {
  async execute({
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getRepository)(_User.default);
    const checkCustomerExists = await usersRepository.findOne({
      where: {
        email
      }
    });

    if (checkCustomerExists) {
      throw new _appError.default('User already exists');
    }

    const hashedPassword = await (0, _bcrypt.hash)(password, 8);
    const user = usersRepository.create({
      email,
      password: hashedPassword
    });
    await usersRepository.save(user);
    return (0, _classTransformer.classToClass)(user);
  }

}

var _default = CreateUserService;
exports.default = _default;