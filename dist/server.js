"use strict";

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _routes = _interopRequireDefault(require("./routes"));

var _upload = _interopRequireDefault(require("./config/upload"));

var _AppError = _interopRequireDefault(require("./errors/AppError"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.directory));
app.use(_routes.default); // USADO PARA TRATAR OS ERROS, DEVE ESTAR DEPOIS DAS ROTAS
// PARA FUNCIONAR EXIGE O PACOTE EXPRESS-ASYNC-ERRORS

app.use((err, request, response, _) => {
  // VERIFICA SE O ERRO FOI ORIGINADO DO APPERROR, OU SEJA, É UM ERRO QUE EU CONHECO
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});