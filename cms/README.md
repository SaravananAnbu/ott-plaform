# OTT Platform CMS

A comprehensive Content Management System built with React, TypeScript, and Ant Design for managing an OTT (Over-The-Top) streaming platform.

## Features

### 🎯 Dashboard
- **Statistics Overview**: Real-time counts of users, content, plans, and subscriptions
- **Quick Stats Cards**: Visual representation of key metrics
- **Recent Activity**: Placeholder for activity tracking
- **Quick Actions**: Easy access to common tasks

### 👥 User Management
- **Users CRUD**: Complete Create, Read, Update, Delete operations
- **User Details**: Email, phone number, country, active status
- **Search & Filter**: Easy user discovery
- **Status Management**: Active/Inactive user states

### 👤 Profile Management  
- **Profile CRUD**: Full profile management capabilities
- **User Association**: Link profiles to users
- **Age Restrictions**: Kids, Teens, Adults content filtering
- **Avatar Support**: Profile image management

### 🎬 Content Management
- **Content CRUD**: Complete content lifecycle management
- **Rich Metadata**: Title, description, categories, ratings
- **Media Assets**: Poster, banner, thumbnail URLs
- **Content Categories**: Movies, Series, Episodes, Live, Documentaries
- **Maturity Ratings**: G, PG, PG-13, R, NC-17, U, A
- **Status Tracking**: Draft, Published, Archived

### 💎 Subscription Plans
- **Plan CRUD**: Full subscription plan management
- **Pricing**: Flexible pricing in cents with currency support
- **Features**: Resolution, screen limits, download permissions
- **Plan Details**: Comprehensive plan configuration

### 📋 Subscription Management
- **Subscription CRUD**: Complete subscription lifecycle
- **User-Plan Association**: Link users to specific plans
- **Status Tracking**: Active, Cancelled, Expired, Paused
- **Auto-Renewal**: Automatic subscription renewal settings
- **Date Management**: Start and end date tracking

### 🏷️ Genre Management
- **Genre CRUD**: Category and genre management
- **Descriptions**: Detailed genre descriptions
- **Content Association**: Link genres to content

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **UI Framework**: Ant Design 5.x
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Date Handling**: Day.js

## API Integration

The CMS is designed to integrate with the NestJS backend API with the following endpoints:

- `/users` - User management
- `/profiles` - Profile management  
- `/content` - Content management
- `/plans` - Subscription plans
- `/subscriptions` - Subscription management
- `/genres` - Genre management

### Fallback Support
When the backend is not available, the CMS automatically falls back to mock data for demonstration purposes.

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the CMS directory:
```bash
cd cms
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

### Backend Integration

To connect with the actual backend:

1. Start the NestJS backend server on port 3001
2. Ensure PostgreSQL database is running and configured
3. The CMS will automatically connect to the API endpoints

### Build for Production

```bash
npm run build
```

## Screenshots

### Dashboard Overview
![Dashboard](https://github.com/user-attachments/assets/828c4265-bb6a-4c00-afac-808b8354bf43)

### Content Management with CRUD Modal
![Content Modal](https://github.com/user-attachments/assets/60ec8a59-2d0d-44be-bc31-b407e0d9b3aa)

## Features Implemented

✅ **Complete CRUD Operations** for all entities
✅ **Dashboard with Statistics** and overview cards  
✅ **Modern UI** with Ant Design components
✅ **Responsive Design** optimized for desktop
✅ **API Integration** with automatic fallback to mock data
✅ **Form Validation** with comprehensive error handling
✅ **Search and Filtering** capabilities
✅ **Pagination** for large datasets
✅ **Loading States** and error handling
✅ **Modal Forms** for create/edit operations
✅ **Confirmation Dialogs** for delete operations

## Project Structure

```
cms/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Layout components (AppLayout)
│   ├── pages/              # Page components (Dashboard, Users, etc.)
│   ├── services/           # API services and mock data
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the OTT Platform system.
