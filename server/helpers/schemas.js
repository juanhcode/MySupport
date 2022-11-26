const Joi = require('joi');
const joi = require('joi');

const usuarioParamSchema = joi.object({
    id: joi.number().required()
})

const post_put_UsuarioSchema = joi.object({
    nombre: joi.string().max(30).required(),
    apellidos: joi.string().max(50).required(),
    password: joi.string().max(50).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).max(50).required(),
    rol: joi.string().max(20).required(),
    estado: joi.boolean()
});

module.exports = {
    post_put_UsuarioSchema,
    usuarioParamSchema
}