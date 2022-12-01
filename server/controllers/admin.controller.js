const administradorService = require("../services/admin.service");
const getDomain = require ("../helpers/getDomain");

const getUsuariosPorEmpresa = async (req, res) => {
  const { authorization } = req.headers;
  const domain = await getDomain(authorization);

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

const getTotalTickets = async (req, res) => {
  const { authorization } = req.headers;
  const domain = await getDomain(authorization);

  const result = await administradorService.cantidadTotalTicketsPorEmpresa(domain);

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
  getTotalTickets
};
