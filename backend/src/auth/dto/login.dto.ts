import * as Joi from 'joi';

export class LoginDto {
  email?: string;
  phoneNumber?: string;
  password: string;
}

export const loginSchema = Joi.object({
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().min(10).max(20).optional(),
  password: Joi.string().min(6).required(),
}).xor('email', 'phoneNumber'); // Either email or phoneNumber is required, but not both
