const empresaService = require("../services/empresa.service");

const creationEmpresa = async (req, res) => {
  const { NIT, nombre, pais, ciudad, direccion, email } = req.body;
  const Empresa = {
    NIT,
    nombre,
    pais,
    ciudad,
    direccion,
    email,
  };
  //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal
  const empresaCreated = await empresaService.creationEmpresa(Empresa);
  if (!empresaCreated.rowCount == 2) {
    res.status(500).send({
      message: "¡Ups! Algo salió mal",
    });
    return;
  }
  res.status(200).send({
    message: "Empresa Creada",
  });
};

const updateEmpresa = async (req, res) => {
  const { ID } = req.params;
  const { NIT, nombre, pais, ciudad, direccion, email } = req.body;
  const Empresa = {
    ID,
    NIT,
    nombre,
    pais,
    ciudad,
    direccion,
    email,
    NIT,
  };

  //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal

  const empresaUpdated = await empresaService.updateEmpresa(Empresa);
  if (!empresaUpdated.rowCount == 1) {
    res.status(500).send({
      message: "¡Ups! Algo salió mal",
    });
    return;
  }
  res.status(200).send({
    message: "Empresa Actualizada",
  });
};

const createArea = async (req, res) => {
  const { AREA_ID, NIT, nombre } = req.body;
  const Area = {
    AREA_ID,
    NIT,
    nombre,
  };

  //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal

  const areaCreated = await empresaService.creatingArea(Area);
  if (!areaCreated.rowCount == 1) {
    res.status(500).send({
      message: "¡Ups! Algo salió mal",
    });
    return;
  }
  res.status(200).send({
    message: "Area Creada",
  });
};

const areasGet = async (req, res) => {
  //Recibiendo un query en la url
  //Ejemplo de URL: http://localhost:8080/api/users?apellido1=cifuentes&apellido2=florez
  const { limite = 5, desde = 0 } = req.query;

  const paginatedQuery = await empresaService.readingArea(limite, desde);

  res.json({
    paginatedQuery,
  });
};

const updateArea = async (req, res) => {
  const { AREA_ID } = req.params;
  const { nombre } = req.body;
  const Area = {
    AREA_ID,
    nombre,
  };

  //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal

  const areaUpdated = await empresaService.updatingArea(Area);
  if (!areaUpdated.rowCount == 1) {
    res.status(500).send({
      message: "¡Ups! Algo salió mal",
    });
    return;
  }
  res.status(200).send({
    message: "Area Actualizada",
  });
};

const deleteArea = async (req, res) => {
  const { AREA_ID } = req.params;
  //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal
  const areaDeleted = await empresaService.deletingArea(AREA_ID);
  if (!areaDeleted.rowCount == 1) {
    res.status(500).send({
      message: "¡Ups! Algo salió mal",
    });
    return;
  }
  res.status(200).send({
    message: `Area ${AREA_ID} eliminado satisfactoriamente`,
  });
};

module.exports = {
  creationEmpresa,
  updateEmpresa,
  createArea,
  areasGet,
  updateArea,
  deleteArea,
};
