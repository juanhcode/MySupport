const administradorService = require("../services/admin.service");
const { decodeSign } = require("../helpers/generateToken");

const getUsuariosPorEmpresa = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const user = decodeSign(token);
  const { email } = user;
  const array = email.split("@");
  const dotsplit = array[1].split(".");
  const domain = dotsplit[0];

  const result = await administradorService.usuarioPorEmpresaService(domain);

  if (result === null) {
    res.status(404).send({
      message: "No hay registros en la DB",
    });
    return;
  }
  res.status(200).send({
    result,
  });
};

module.exports = {
  getUsuariosPorEmpresa,
};
