import Joi from 'joi';

const schema = Joi.object({
  nome: Joi.string().min(2).required().messages({
    'string.min': 'O campo de {#label} precisa de no mínimo 2 caracteres.',
  }),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
}).messages({
  'any.required': 'O campo de {#label} é obrigatório.',
  'string.email': 'O campo de {#label} deve ser um email válido.',
  'string.empty': 'O campo de {#label} não pode estar vazio.',
  'string.min': 'O campo de {#label} precisa de no mínimo 6 caracteres.',
  'object.unknown': 'O campo de {#label} não é permitido',
});

export default schema;
