import * as Joi from 'joi';
import { UserRole } from '../../enums/user-role.enum';

export class RegisterDto {
  email?: string;
  phoneNumber?: string;
  password: string;
  country?: string;
  role?: UserRole;
}

export const registerSchema = Joi.object({
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().min(10).max(20).optional(),
  password: Joi.string().min(6).required(),
  country: Joi.string().length(2).optional(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .default(UserRole.USER),
}).xor('email', 'phoneNumber'); // Either email or phoneNumber is required, but not both
