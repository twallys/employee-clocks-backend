"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../config/auth"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _User = _interopRequireDefault(require("../models/User"));

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
      throw new _AppError.default('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatched) {
      throw new _AppError.default('Incorrect email/password combination.', 401);
    } // COMO PARAMETROS O SIGN PODE RECEBER
    // PAYLOAD => SÃO INFORMAÇÕES QUE TALVEZ QUEIRAMOS PASSAR(ID DO USUARIO, EMAIL ETC)
    // SECRET =>  SERVE COMO CHAVE PARA DESCRIPTOGRAFAR (USAR O SITE MD5 ONLINE)


    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}

var _default = AuthenticateUserService;
exports.default = _default;