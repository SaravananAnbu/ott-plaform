# Authentication & Validation System

## Overview
This implementation adds JWT-based authentication with role-based access control and Joi validation to the OTT platform backend.

## Features Added

### 1. JWT Authentication
- Login and register endpoints with JWT token generation
- Password hashing using bcryptjs
- Support for both email and phone number authentication

### 2. Role-Based Access Control
- Three user roles: `admin`, `user`, `moderator`
- Role-based guards protecting sensitive endpoints
- Flexible role assignment system

### 3. Joi Validation
- Alternative validation system using Joi schemas
- Comprehensive validation for all DTOs
- Custom validation pipe for seamless integration

## API Endpoints

### Authentication
```
POST /auth/register - Register new user
POST /auth/login    - User login
```

### Protected Endpoints
All `/users` and `/profiles` endpoints now require authentication and appropriate roles.

## Usage Examples

### Register User
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

### Login User
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Access Protected Endpoint
```bash
curl -X GET http://localhost:3001/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Variables
Add to your `.env` file:
```
JWT_SECRET=your-super-secret-jwt-key-here
```

## Database Changes
The User entity now includes:
- `password` field for authentication
- `role` field for access control (defaults to 'user')

## Validation
Both class-validator (existing) and Joi validation are supported:
- Regular endpoints use class-validator
- Alternative `/joi` endpoints demonstrate Joi validation
- All authentication endpoints use Joi validation