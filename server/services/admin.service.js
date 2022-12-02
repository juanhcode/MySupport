const Admin = require('../database/models/Admin');

const usuarioPorEmpresaService = async (dominio) => {
    const filtro = await Admin.getAllUsers(dominio);
    return filtro;
}

const cantidadTotalTicketsPorEmpresa = async (dominio) => {
    const filtro = await Admin.getTicketsPorEmpresa(dominio);
    return filtro;
}

const cantidadEmpleadosPorEmpresa = async (dominio) => {
    const filtro = await Admin.getEmpleadosPorEmpresa(dominio);
    return filtro;
} 

const cantidadSupervisoresPorEmpresa = async (dominio) => {
    const filtro = await Admin.getSupervisorPorEmpresa(dominio);
    return filtro;
} 

const cantidadAgentesPorEmpresa = async (dominio) => {
    const filtro = await Admin.getAgentePorEmpresa(dominio);
    return filtro;
} 

const cantidadTicketsPorArea = async (area) => {
    const filtro = await Admin.getTicketsPorArea(area);
    return filtro;
} 

module.exports = {
    usuarioPorEmpresaService,
    cantidadTotalTicketsPorEmpresa,
    cantidadEmpleadosPorEmpresa,
    cantidadSupervisoresPorEmpresa,
    cantidadAgentesPorEmpresa,
    cantidadTicketsPorArea
}