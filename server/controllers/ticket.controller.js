const ticketService = require('../services/ticket.service.js');
const cloudinary = require('../helpers/configCloudinary');
//Obtener tickets abiertos
const getAllOpenTickets = async (req,res)=>{
    const tickets = await ticketService.getAllOpenTickets();
    if(tickets.length == 0){
        res.staus(200).send({message: 'No tienes casos'})
    }else{
        res.status(200).send(tickets);
    }
}
//Obtener tickets cerrados
const getAllClosedTickets = async (req,res)=>{
    const tickets = await ticketService.getAllClosedTickets();
    if(tickets.length == 0){
        res.staus(200).send({message: 'No tienes casos'})
    }else{
        res.status(200).send(tickets);
    }
}
//Obtener tickets aprobados
const getAllApprovedTickets = async (req,res)=>{
    const tickets = await ticketService.getAllApprovedTickets();
    if(tickets.length == 0){
        res.staus(200).send({message: 'No tienes casos'})
    }else{
        res.status(200).send(tickets);
    }
}
//Subir archivos a cloudinary
const saveImage =async (req,res) => {
    const result = await cloudinary.v2.uploader.upload(req.files[0].path,{folder:"tickets"});
    res.status(200).send({message:result.url});
}
//Creacion de tickets
const creationTickets = async (req,res)=>{
    const {ticket_id,empleado_id,titulo,descripcion,imagenURL,fecha_inicio,estado} = req.body;
    //TODO:validar que los campos no sean vacios y si lo son responder con un mensaje de error o algo asi xd
    const Ticket = {
        ticket_id,
        empleado_id,
        titulo,
        descripcion,
        imagenURL,
        fecha_inicio,
        estado
    }
    const tickets = await ticketService.creationTickets(Ticket);
    res.status(200).send({
        message:"Caso Creado",
        tickets,
    });
}

module.exports = {
    getAllOpenTickets,
    getAllClosedTickets,
    getAllApprovedTickets,
    creationTickets,
    saveImage
}