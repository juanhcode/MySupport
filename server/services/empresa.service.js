const Empresa = require('../database/models/Empresa');

const creationEmpresa = async (empresa)=>{
    const EmpresaCreated = await Empresa.createEmpresa(empresa);
    return EmpresaCreated;
}

const updateEmpresa = async (empresa)=>{
    const EmpresaUpdated = await Empresa.updatingEmpresa(empresa);
    return EmpresaUpdated;
}

const creatingArea = async (area)=>{
    const areaUpdated = await Empresa.createArea(area);
    return areaUpdated;
}

const readingArea = async (limite, desde)=>{
    const areaList = await Empresa.readArea(limite, desde);
    return areaList;
}

const updatingArea = async (updateArea)=>{
    const areaUpdated = await Empresa.updatingArea(updateArea);
    return areaUpdated;
}

const deletingArea = async (area_id)=>{
    const areaDeleted = await Empresa.deletingArea(area_id);
    return areaDeleted;
}

module.exports = {
    creationEmpresa,
    updateEmpresa,
    creatingArea,
    readingArea,
    updatingArea,
    deletingArea
}