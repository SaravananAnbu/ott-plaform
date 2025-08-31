import * as Joi from 'joi';
import { ContentCategory, MaturityRating, ContentStatus } from '../../enums';

export class CreateContentJoiDto {
  title: string;
  description?: string;
  about?: string;
  category: ContentCategory;
  releaseDate?: string;
  durationMinutes?: number;
  language?: string;
  maturityRating?: MaturityRating;
  imdbRating?: number;
  posterUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  adUrl?: string;
  playerId?: number;
  status?: ContentStatus;
}

export const createContentSchema = Joi.object({
  title: Joi.string().min(1).max(300).required(),
  description: Joi.string().optional(),
  about: Joi.string().optional(),
  category: Joi.string()
    .valid(...Object.values(ContentCategory))
    .required(),
  releaseDate: Joi.date().iso().optional(),
  durationMinutes: Joi.number().integer().min(1).optional(),
  language: Joi.string().min(1).max(40).optional(),
  maturityRating: Joi.string()
    .valid(...Object.values(MaturityRating))
    .optional(),
  imdbRating: Joi.number().min(0).max(10).optional(),
  posterUrl: Joi.string().uri().optional(),
  bannerUrl: Joi.string().uri().optional(),
  thumbnailUrl: Joi.string().uri().optional(),
  adUrl: Joi.string().uri().optional(),
  playerId: Joi.number().integer().optional(),
  status: Joi.string()
    .valid(...Object.values(ContentStatus))
    .optional(),
});
