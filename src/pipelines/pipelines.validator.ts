import Joi from 'joi';

const superResFilter = Joi.object({
  name: Joi.string().valid('SR'),
  config: Joi.object({
    factor: Joi.string().valid('4/3', '3/2', '2', '3', '4').required(),
    strength: Joi.number().min(0).max(1).required(),
  }).required(),
});

const pipeline = Joi.object({
  inputProtoc: Joi.string().valid('RTMP').required(),
  outputProtocol: Joi.string().valid('RTMP').required(),
  filters: Joi.array().items(Joi.alternatives().try(superResFilter)).required(),
});

export default pipeline;