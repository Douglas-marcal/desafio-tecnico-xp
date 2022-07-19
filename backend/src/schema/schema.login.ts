import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
}).messages({
  'any.required': 'O campo de {#label} é obrigatório.',
  'string.email': 'O campo de {#label} deve ser um email válido.',
  'string.empty': 'O campo de {#label} não pode estar vazio.',
  'string.min': 'O campo de {#label} precisa de no mínimo 6 caracteres.',
});

export default schema;
