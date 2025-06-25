// Authentication Configuration
// Change this to false when your backend is ready
export const USE_MOCK_BACKEND = true;

// Mock user credentials for testing
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

// Role permissions mapping
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

// Public pages that don't require authentication
export const PUBLIC_PAGES = [
    '/',
    '/home',
    '/agency',
    '/resources', 
    '/channels',
    '/influencers',
    '/news',
    '/campaigns',
    '/events',
    '/auth/signIn',
    '/signUp'
];

// Protected pages that require authentication
export const PROTECTED_PAGES = [
    '/myAccount'
];

// Pages that require specific roles
export const ROLE_REQUIRED_PAGES = {
    '/admin': ['admin'],
    '/analytics': ['agency', 'marketer', 'admin']
}; 