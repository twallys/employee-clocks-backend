"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _auth = _interopRequireDefault(require("../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  // VALIDACAO DO TOKEN JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  } // Bearer Token


  const [, token] = authHeader.split(' ');

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded; // DESSA FORMA O ID DO USUARIO FICA DISPONIVEL NO REQUEST EM TODAS AS ROTAS QUE USAM O JWT

    request.user = {
      id: sub
    };
    return next();
  } catch (err) {
    throw new _AppError.default('Invalid JWT Token', 401);
  }
}