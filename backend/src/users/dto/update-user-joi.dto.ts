import * as Joi from 'joi';
import { UserRole } from '../../enums/user-role.enum';

export class UpdateUserJoiDto {
  phoneNumber?: string;
  email?: string;
  password?: string;
  country?: string;
  role?: UserRole;
  isActive?: boolean;
}

export const updateUserSchema = Joi.object({
  phoneNumber: Joi.string().min(10).max(20).optional(),
  email: Joi.string().email().max(255).optional(),
  password: Joi.string().min(6).optional(),
  country: Joi.string().length(2).optional(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .optional(),
  isActive: Joi.boolean().optional(),
});
