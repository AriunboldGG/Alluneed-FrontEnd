# Authentication & Authorization System

This document explains how to use the frontend authentication and authorization system that works independently of the backend.

## Overview

The system provides a complete authentication and authorization solution that can work with both mock data (for development) and real backend APIs. It includes:

- **Mock Authentication**: Simulates backend authentication for frontend development
- **Role-based Authorization**: Different permissions for different user types
- **Protected Routes**: Components to guard pages based on authentication/authorization
- **Easy Configuration**: Simple flag to switch between mock and real backend

## Configuration

### Switching Between Mock and Real Backend

Edit `config/auth.js`:

```javascript
// Change this to false when your backend is ready
export const USE_MOCK_BACKEND = true;
```

### Mock User Credentials

The system comes with pre-configured test accounts:

```javascript
export const MOCK_USERS = {
    INFLUENCER: {
        email: 'john@example.com',
        password: 'password123',
        role: 'influencer'
    },
    AGENCY: {
        email: 'jane@example.com',
        password: 'password123',
        role: 'agency'
    },
    MARKETER: {
        email: 'bob@example.com',
        password: 'password123',
        role: 'marketer'
    }
};
```

## Usage

### 1. Using the useAuth Hook

```javascript
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
    const { 
        isAuthenticated, 
        user, 
        hasRole, 
        canAccess, 
        logout 
    } = useAuth();

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <div>Please log in</div>;
    }

    // Check if user has specific role
    if (hasRole('admin')) {
        return <div>Admin panel</div>;
    }

    // Check if user can access specific permission
    if (canAccess('create_campaign')) {
        return <div>Create campaign button</div>;
    }

    return (
        <div>
            <p>Welcome, {user.name}!</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
```

### 2. Using ProtectedRoute Component

```javascript
import ProtectedRoute from '@/components/ProtectedRoute';

// Require authentication
<ProtectedRoute requireAuth={true}>
    <MyAccountPage />
</ProtectedRoute>

// Require specific role
<ProtectedRoute requireAuth={true} requiredRole="admin">
    <AdminPanel />
</ProtectedRoute>

// Require specific permission
<ProtectedRoute requireAuth={true} requiredPermission="create_campaign">
    <CampaignCreator />
</ProtectedRoute>
```

### 3. Role-based Permissions

The system defines permissions for each role:

```javascript
export const ROLE_PERMISSIONS = {
    influencer: [
        'view_agencies',
        'view_resources', 
        'view_channels',
        'view_influencers',
        'view_my_account',
        'edit_profile'
    ],
    agency: [
        'view_agencies',
        'view_resources',
        'view_channels', 
        'view_influencers',
        'view_my_account',
        'edit_profile',
        'create_campaign',
        'view_analytics'
    ],
    marketer: [
        'view_agencies',
        'view_resources',
        'view_channels',
        'view_influencers', 
        'view_my_account',
        'edit_profile',
        'create_campaign',
        'view_analytics'
    ],
    admin: [
        'view_agencies',
        'view_resources',
        'view_channels',
        'view_influencers',
        'view_my_account',
        'edit_profile',
        'create_campaign',
        'view_analytics',
        'manage_users'
    ]
};
```

## API Integration

### Mock API Service

The mock API service (`service/mockAuth.js`) provides:

- **Authentication**: Login, register, getUserData
- **Data Endpoints**: Simulated responses for all major endpoints
- **Realistic Delays**: Simulates network latency

### Real Backend Integration

When `USE_MOCK_BACKEND = false`, the system will:

1. Use real API calls to your backend
2. Handle authentication tokens properly
3. Manage user sessions
4. Handle API errors and unauthorized responses

## File Structure

```
├── config/
│   └── auth.js                 # Configuration and permissions
├── service/
│   ├── api.js                  # Main API service
│   └── mockAuth.js             # Mock authentication service
├── hooks/
│   └── useAuth.js              # Authentication hook
├── components/
│   └── ProtectedRoute/
│       └── index.js            # Route protection component
├── app/
│   ├── auth/signIn/page.js     # Sign-in page
│   ├── signUp/page.js          # Sign-up page
│   └── (web)/myAccount/page.js # Protected account page
└── docs/
    └── AUTHENTICATION.md       # This documentation
```

## Testing

### Mock Backend Testing

1. Set `USE_MOCK_BACKEND = true` in `config/auth.js`
2. Use the provided test accounts:
   - **Influencer**: john@example.com / password123
   - **Agency**: jane@example.com / password123
   - **Marketer**: bob@example.com / password123
3. Test different roles and permissions

### Real Backend Testing

1. Set `USE_MOCK_BACKEND = false` in `config/auth.js`
2. Ensure your backend is running and accessible
3. Test with real user accounts

## Security Features

- **Token Management**: Automatic token storage and cleanup
- **Session Handling**: Proper session management
- **Error Handling**: Graceful handling of authentication errors
- **Route Protection**: Automatic redirection for unauthorized access
- **Permission Validation**: Server-side permission checking

## Migration to Real Backend

When your backend is ready:

1. Set `USE_MOCK_BACKEND = false` in `config/auth.js`
2. Update `service/path.js` with your backend URL
3. Ensure your backend endpoints match the expected format
4. Test all authentication flows
5. Remove mock data references if desired

## Troubleshooting

### Common Issues

1. **401 Unauthorized Errors**: Check token format and backend expectations
2. **Permission Denied**: Verify user role and permissions
3. **Mock Data Not Loading**: Ensure `USE_MOCK_BACKEND = true`
4. **Real Backend Not Working**: Check network connectivity and API endpoints

### Debug Mode

Enable console logging in `service/api.js` to debug authentication issues:

```javascript
console.log('Token being sent:', token);
console.log('API response:', response);
```

## Best Practices

1. **Always use ProtectedRoute** for pages that require authentication
2. **Check permissions** before rendering sensitive components
3. **Handle loading states** during authentication checks
4. **Provide fallback UI** for unauthorized users
5. **Test with different roles** to ensure proper authorization
6. **Keep mock data realistic** for better development experience 