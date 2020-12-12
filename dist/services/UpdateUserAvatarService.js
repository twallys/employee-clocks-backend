"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _upload = _interopRequireDefault(require("../config/upload"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class UpdateUserAvatarService {
  async execute({
    user_id,
    avatarFilename
  }) {
    const usersRepository = (0, _typeorm.getRepository)(_User.default);
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new _AppError.default('Only authenticated users can update Avatar', 401);
    }

    if (user.avatar) {
      // DELETAR AVATAR ANTERIOR
      // AQUI ESTOU JUNTANDO O DIRETORIO COM O NOME DO AVATAR
      const userAvatarFilePath = _path.default.join(_upload.default.directory, user.avatar); // AQUI ESTOU VERIFICANDO SE O FILE EXISTE


      const userAvatarFileExists = await _fs.default.promises.stat(userAvatarFilePath); // SE EXISTIR ELE VAI DELETAR O AVATAR DA PASTA TEMP

      if (userAvatarFileExists) {
        await _fs.default.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename; // PODE SER UTILIZADO PARA ALTERAR, SE ELE TIVER ID, ELE ALTERA, SE NAO TIVER SALVA

    await usersRepository.save(user);
    return user;
  }

}

var _default = UpdateUserAvatarService;
exports.default = _default;