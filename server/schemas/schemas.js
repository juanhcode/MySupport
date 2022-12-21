const joi = require('joi');

const usuarioParamSchema = joi.object({
    id: joi.string().required()
})

const post_put_UsuarioSchema = joi.object({
    nombre: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).max(30).required(),
    apellidos: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).max(50).required(),
    password: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).max(100).required(),
    email: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).max(50).required(),
    rol: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).max(20).required(),
    estado: joi.boolean(),
    area_id: joi.number(),
    supervisor_id:joi.string()
});

module.exports = {
    post_put_UsuarioSchema,
    usuarioParamSchema
}