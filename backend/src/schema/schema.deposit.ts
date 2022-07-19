import Joi from 'joi';

const schema = Joi.object({
  CodCliente: Joi.number().greater(0).integer().required(),
  Valor: Joi.number().greater(0).precision(2).required(),
}).messages({
  'number.greater': 'O campo de {#label} precisa ser maior do que 0.',
  'number.integer': 'O campo de {#label} precisa ser um número inteiro.',
  'number.base': 'O campo de {#label} precisa ser um número.',
  'number.precision': 'O campo de {#label} deve ter apenas no máximo duas casas decimais.',
  'any.required': 'O campo de {#label} é obrigatório.',
  'object.unknown': 'O campo de {#label} não é permitido.',
}).strict(true);

export default schema;
