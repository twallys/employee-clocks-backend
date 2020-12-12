"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _appointments = _interopRequireDefault(require("./appointments.routes"));

var _users = _interopRequireDefault(require("./users.routes"));

var _sessions = _interopRequireDefault(require("./sessions.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src/routes/index.ts
const routes = (0, _express.Router)();
routes.use('/appointments', _appointments.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
var _default = routes;
exports.default = _default;