# OTT Platform Backend API

This NestJS backend provides a comprehensive API for an OTT (Over-The-Top) streaming platform with complete entity management based on a PostgreSQL database schema.

## Features

### Authentication & Security
- **JWT Authentication** with role-based access control
- **Password hashing** using bcryptjs
- **Joi validation** for request data validation
- **Role-based guards** protecting sensitive endpoints

### Implemented Entities & API Endpoints

#### Authentication
- **Auth** (`/auth`)
  - `POST /auth/register` - Register new user (with email/phone + password)
  - `POST /auth/login` - User login (returns JWT token)

#### Core User Management
- **Users** (`/users`) - **Protected: Requires JWT authentication**
  - `GET /users` - Get all users (Admin/Moderator only)
  - `GET /users/:id` - Get user by ID
  - `POST /users` - Create new user (Admin only)
  - `POST /users/joi` - Create user with Joi validation (Admin only)
  - `PATCH /users/:id` - Update user (Admin only)
  - `PATCH /users/:id/joi` - Update user with Joi validation (Admin only)
  - `DELETE /users/:id` - Delete user (Admin only)
  - `GET /users/email/:email` - Find user by email
  - `GET /users/phone/:phoneNumber` - Find user by phone

- **Profiles** (`/profiles`) - **Protected: Requires JWT authentication**
  - `GET /profiles` - Get all profiles (Admin/Moderator only)
  - `GET /profiles/:id` - Get profile by ID
  - `POST /profiles` - Create new profile
  - `PATCH /profiles/:id` - Update profile
  - `DELETE /profiles/:id` - Delete profile
  - `GET /profiles/user/:userId` - Get profiles for a user

#### Content Management
- **Content** (`/content`)
  - `GET /content` - Get all content (with optional category/status filters)
  - `GET /content/:id` - Get content by ID
  - `POST /content` - Create new content
  - `PATCH /content/:id` - Update content
  - `DELETE /content/:id` - Delete content

- **Genres** (`/genres`)
  - `GET /genres` - Get all genres
  - `GET /genres/:id` - Get genre by ID
  - `POST /genres` - Create new genre
  - `PATCH /genres/:id` - Update genre
  - `DELETE /genres/:id` - Delete genre
  - `GET /genres/name/:name` - Find genre by name

#### Subscription Management
- **Plans** (`/plans`)
  - `GET /plans` - Get all plans
  - `GET /plans/:id` - Get plan by ID
  - `POST /plans` - Create new plan
  - `PATCH /plans/:id` - Update plan
  - `DELETE /plans/:id` - Delete plan
  - `GET /plans/name/:planName` - Find plan by name

- **Subscriptions** (`/subscriptions`)
  - `GET /subscriptions` - Get all subscriptions
  - `GET /subscriptions/:id` - Get subscription by ID
  - `POST /subscriptions` - Create new subscription
  - `PATCH /subscriptions/:id` - Update subscription
  - `DELETE /subscriptions/:id` - Delete subscription
  - `GET /subscriptions/user/:userId` - Get user subscriptions

### Database Schema

The implementation includes 31 entities covering:

#### Core Entities
- Users, Profiles, Authentication (OTP, QR, Sessions, Devices)
- Plans, Subscriptions, Payments
- Content, Series, Seasons, Episodes, Player

#### Media & Metadata
- Trailers, Subtitles, AudioTracks
- Genres, Cast, Crew with many-to-many relationships
- External Ratings (IMDB, etc.)

#### Personalization
- My List, Ratings, Watch History, Recommendations

#### Content Management
- Pages, Sections, Content Placement

### Enums
- Content Category, Maturity Rating, Content Status
- Subscription Status, Payment Status
- Session Status, Rating Scale
- Section Layout, Profile Age Restriction
- User Roles (Admin, User, Moderator)

## Authentication & Security

### JWT Authentication
The platform uses JWT (JSON Web Tokens) for stateless authentication:

1. **Register**: `POST /auth/register` - Create new user account
2. **Login**: `POST /auth/login` - Authenticate and receive JWT token
3. **Protected Routes**: Include JWT token in Authorization header

### User Roles
- **admin**: Full access to all endpoints
- **moderator**: Read access to users and profiles
- **user**: Default role for regular users

### Request Examples

#### Register User
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "role": "user"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Access Protected Endpoint
```bash
curl -X GET http://localhost:3001/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Validation
The platform supports both **class-validator** (existing) and **Joi** validation:
- Authentication endpoints use Joi validation
- Alternative `/joi` endpoints demonstrate Joi validation
- Regular endpoints continue using class-validator

## Setup & Configuration

### Prerequisites
- Node.js (v16+)
- PostgreSQL database

### Installation
```bash
npm install
```

### Database Configuration
Copy the example environment file and configure your database:
```bash
cp .env.example .env
```

Update `.env` with your database settings:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=ott_platform

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
```

### Running the Application
```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod
```

### API Documentation
The API includes comprehensive validation using class-validator decorators and proper error handling with HTTP status codes.

All endpoints support standard HTTP methods (GET, POST, PATCH, DELETE) with appropriate request/response structures using TypeScript DTOs.

### TypeORM Integration
- Automatic database schema synchronization in development
- Comprehensive entity relationships with proper foreign keys
- Database migrations support for production deployments