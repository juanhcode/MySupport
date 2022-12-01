const Admin = require('../database/models/Admin');

const usuarioPorEmpresaService = async (dominio) => {
    const filtro = await Admin.getAllUsers(dominio);
    return filtro;
}

const cantidadTotalTicketsPorEmpresa = async (dominio) => {
    const filtro = await Admin.getTicketsPorEmpresa(dominio);
    return filtro;
}

module.exports = {
    usuarioPorEmpresaService,
    cantidadTotalTicketsPorEmpresa
}