import * as Joi from 'joi';
import { ProfileAgeRestriction } from '../../enums';

export class CreateProfileJoiDto {
  userId: number;
  profileName: string;
  pinCode: string;
  ageRestriction?: ProfileAgeRestriction;
  avatarUrl?: string;
}

export const createProfileSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  profileName: Joi.string().min(1).max(100).required(),
  pinCode: Joi.string().length(6).required(),
  ageRestriction: Joi.string()
    .valid(...Object.values(ProfileAgeRestriction))
    .optional(),
  avatarUrl: Joi.string().uri().optional(),
});
