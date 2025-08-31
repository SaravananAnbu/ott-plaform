import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

describe('JoiValidationPipe', () => {
  let pipe: JoiValidationPipe;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  beforeEach(() => {
    pipe = new JoiValidationPipe(schema);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should validate and return valid data', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = pipe.transform(validData, {} as any);

    expect(result).toEqual(validData);
  });

  it('should throw BadRequestException for invalid data', () => {
    const invalidData = {
      email: 'invalid-email',
      password: '123', // too short
    };

    expect(() => pipe.transform(invalidData, {} as any)).toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException for missing required fields', () => {
    const incompleteData = {
      email: 'test@example.com',
      // missing password
    };

    expect(() => pipe.transform(incompleteData, {} as any)).toThrow(
      BadRequestException,
    );
  });
});
