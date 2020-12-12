"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AuthenticateUserService = _interopRequireDefault(require("../services/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
sessionsRouter.post('/', async (request, response) => {
  const {
    email,
    password
  } = request.body;
  const authenticateUser = new _AuthenticateUserService.default();
  const {
    user,
    token
  } = await authenticateUser.execute({
    email,
    password
  });
  return response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    },
    token
  });
});
var _default = sessionsRouter;
exports.default = _default;