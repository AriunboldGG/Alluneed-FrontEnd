// Mock Authentication Service
// This simulates backend authentication for frontend development

// Mock user database
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'tsooj@example.com',
    password: 'password123',
    role: 'influencer',
    role_id: 1
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'agency',
    role_id: 2
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    role: 'marketer',
    role_id: 3
  }
];

// Mock data for different endpoints
const mockData = {
  // Agencies
  agents: [
    {
      id: 1,
      name: 'Digital Marketing Agency',
      type: { id: 1, name: 'Digital' },
      description: 'Leading digital marketing agency',
      rating: 4.5,
      projects: 150,
      image: '/assets/photo/agency.png'
    },
    {
      id: 2,
      name: 'Creative Studio',
      type: { id: 2, name: 'Creative' },
      description: 'Creative design and branding studio',
      rating: 4.8,
      projects: 89,
      image: '/assets/photo/agency2.PNG'
    },
    {
      id: 3,
      name: 'Tech Solutions',
      type: { id: 1, name: 'Digital' },
      description: 'Technology and digital solutions',
      rating: 4.2,
      projects: 67,
      image: '/assets/photo/agency.png'
    }
  ],

  // Resources
  resources: [
    {
      id: 1,
      title: 'Digital Marketing Guide',
      type: { id: 1, name: 'Guide' },
      description: 'Complete guide to digital marketing',
      image: '/assets/photo/Blog.png',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Social Media Strategy',
      type: { id: 2, name: 'Strategy' },
      description: 'Effective social media strategies',
      image: '/assets/photo/Content.png',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Brand Development',
      type: { id: 3, name: 'Branding' },
      description: 'Building strong brand identity',
      image: '/assets/photo/Blog.png',
      date: '2024-01-05'
    }
  ],

  // Channels
  channels: [
    {
      id: 1,
      name: 'TV 5',
      type: { id: 1, name: 'TV' },
      description: 'National television channel',
      viewers: '2.5M',
      image: '/assets/photo/tv.png'
    },
    {
      id: 2,
      name: 'Voo',
      type: { id: 2, name: 'Radio' },
      description: 'Popular radio station',
      listeners: '500K',
      image: '/assets/photo/fm.png'
    },
    {
      id: 3,
      name: 'MNB',
      type: { id: 3, name: 'OOH' },
      description: 'Digital outdoor advertising',
      impressions: '1M',
      image: '/assets/photo/ooh.png'
    }
  ],

  // Influencers
  users: [
    {
      id: 1,
      name: 'Sarah Wilson',
      role: { id: 1, name: 'Influencer' },
      followers: '100K',
      category: 'Lifestyle',
      image: '/assets/influencers/1.svg'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: { id: 1, name: 'Influencer' },
      followers: '250K',
      category: 'Tech',
      image: '/assets/influencers/2.svg'
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: { id: 1, name: 'Influencer' },
      followers: '75K',
      category: 'Fashion',
      image: '/assets/influencers/3.svg'
    }
  ],

  // References
  references: {
    AGENCY_TYPE: [
      { ID: 1, name: 'Digital', code: 'DIGITAL' },
      { ID: 2, name: 'Creative', code: 'CREATIVE' },
      { ID: 3, name: 'Traditional', code: 'TRADITIONAL' }
    ],
    CHANNEL_TYPE: [
      { ID: 1, name: 'TV', code: 'TV' },
      { ID: 2, name: 'Radio', code: 'RADIO' },
      { ID: 3, name: 'OOH', code: 'OOH' },
      { ID: 4, name: 'Digital', code: 'DIGITAL' }
    ],
    DIGITAL_CHANNELS: [
      { ID: 26, name: 'Instagram', code: 'INSTAGRAM' },
      { ID: 27, name: 'YouTube', code: 'YOUTUBE' },
      { ID: 28, name: 'TikTok', code: 'TIKTOK' }
    ],
    Resources_type: [
      { ID: 1, name: 'Guide', code: 'GUIDE' },
      { ID: 2, name: 'Strategy', code: 'STRATEGY' },
      { ID: 3, name: 'Branding', code: 'BRANDING' }
    ]
  }
};

// Mock authentication functions
export const mockAuth = {
  // Login
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const token = `mock_token_${user.id}_${Date.now()}`;
          const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            role_id: user.role_id
          };
          
          resolve({
            token,
            user: userData,
            response_code: 200,
            response_msg: 'Login successful'
          });
        } else {
          reject({
            response_code: 401,
            response_msg: 'Invalid email or password'
          });
        }
      }, 500); // Simulate network delay
    });
  },

  // Register
  register: async (name, email, password, role_id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          reject({
            response_code: 400,
            response_msg: 'User already exists'
          });
          return;
        }

        // Create new user
        const newUser = {
          id: mockUsers.length + 1,
          name,
          email,
          password,
          role: role_id === 1 ? 'influencer' : role_id === 2 ? 'agency' : 'marketer',
          role_id
        };

        mockUsers.push(newUser);
        
        const token = `mock_token_${newUser.id}_${Date.now()}`;
        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          role_id: newUser.role_id
        };

        resolve({
          token,
          user: userData,
          response_code: 200,
          response_msg: 'Registration successful'
        });
      }, 500);
    });
  },

  // Get user data
  getUserData: async (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token || !token.startsWith('mock_token_')) {
          reject({
            response_code: 401,
            response_msg: 'Invalid token'
          });
          return;
        }

        const userId = token.split('_')[2];
        const user = mockUsers.find(u => u.id === parseInt(userId));
        
        if (user) {
          resolve({
            response_code: 200,
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              role_id: user.role_id
            }
          });
        } else {
          reject({
            response_code: 401,
            response_msg: 'User not found'
          });
        }
      }, 300);
    });
  }
};

// Mock API functions
export const mockAPI = {
  // Generic POST function
  post: async (endpoint, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          switch (endpoint) {
            case 'agent/list':
              resolve({
                data: mockData.agents,
                response_code: 200
              });
              break;

            case 'resources/list':
              resolve({
                data: {
                  data: mockData.resources,
                  pagination: {
                    total_pages: 1,
                    current_page: 1,
                    total_items: mockData.resources.length
                  }
                },
                response_code: 200
              });
              break;

            case 'channel/list':
              resolve({
                data: mockData.channels,
                response_code: 200
              });
              break;

            case 'users/list':
              resolve({
                data: mockData.users,
                response_code: 200
              });
              break;

            case 'reference/list':
              const code = data?.filter?.[0]?.value;
              const references = mockData.references[code] || [];
              resolve({
                data: {
                  data: references
                },
                response_code: 200
              });
              break;

            case 'news/list':
              resolve({
                data: [
                  {
                    id: 1,
                    title: 'Latest Marketing Trends',
                    content: 'Discover the latest trends in digital marketing...',
                    date: '2024-01-15',
                    image: '/assets/photo/Blog.png'
                  },
                  {
                    id: 2,
                    title: 'Social Media Strategy Guide',
                    content: 'Learn effective social media strategies...',
                    date: '2024-01-10',
                    image: '/assets/photo/Content.png'
                  }
                ],
                response_code: 200
              });
              break;

            case 'company/list':
              resolve({
                data: [
                  {
                    id: 1,
                    name: 'Campaign 1',
                    description: 'Successful marketing campaign',
                    image: '/assets/photo/campaings.png',
                    date: '2024-01-15'
                  },
                  {
                    id: 2,
                    name: 'Campaign 2',
                    description: 'Brand awareness campaign',
                    image: '/assets/photo/campaings.png',
                    date: '2024-01-10'
                  }
                ],
                response_code: 200
              });
              break;

            default:
              reject({
                response_code: 404,
                response_msg: 'Endpoint not found'
              });
          }
        } catch (error) {
          reject({
            response_code: 500,
            response_msg: 'Internal server error'
          });
        }
      }, 300); // Simulate network delay
    });
  },

  // Generic GET function
  get: async (endpoint) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          switch (endpoint) {
            case 'users/me':
              resolve({
                response_code: 200,
                data: {
                  id: 1,
                  name: 'John Doe',
                  email: 'john@example.com',
                  role: 'influencer'
                }
              });
              break;

            default:
              reject({
                response_code: 404,
                response_msg: 'Endpoint not found'
              });
          }
        } catch (error) {
          reject({
            response_code: 500,
            response_msg: 'Internal server error'
          });
        }
      }, 300);
    });
  }
}; 

// console.log('Header user:', user, 'isLoggedIn:', isLoggedIn); 