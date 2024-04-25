import Joi from 'joi';

export const bookingValidation = Joi.object({
  event: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .error(new Error('Invalid event id')),
  nummberOfTickets: Joi.number().required(),
});
