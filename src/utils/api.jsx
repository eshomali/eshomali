// src/utils/api.js

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Custom fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
  }
};

/**
 * Client-side mock data for development (until backend is ready)
 */
const mockProjects = [
  {
    id: 1,
    title: 'Restaurant Management',
    slug: 'e-commerce-platform',
    description: 'A full-featured restaurant management app with ordering, a rewards system, delivery, full menu support, and payment processing.',
    images: [
      '../../images/restaurant/1.png',
      '../../images/restaurant/2.png',
      '../../images/restaurant/3.png',
      '../../images/restaurant/4.png',
      '../../images/restaurant/5.png',
      '../../images/restaurant/6.png',
      '../../images/restaurant/7.png',
      '../../images/restaurant/8.png',
      '../../images/restaurant/9.png',
      '../../images/restaurant/10.png',
    ],
    category: 'Food Service',
    category_slug: 'e-commerce',
    client: '{REDACTED}',
    year: 2025,
    demo_url: 'https://retailgrowth-demo.com',
    featured: true,
    technologies: ['Apple iOS', 'Android', 'MacOS', 'Windows PC']
  }, /*
  {
    id: 2,
    title: 'Health Monitoring App',
    slug: 'health-monitoring-app',
    description: 'A cross-platform mobile app for health monitoring with real-time data visualization and personalized insights.',
    image: 'https://via.placeholder.com/800x600?text=Health+Monitoring+App',
    category: 'Mobile App',
    category_slug: 'mobile-app',
    client: 'HealthTech Solutions',
    year: 2022,
    demo_url: 'https://healthtech-monitor.com',
    featured: true,
    technologies: ['React Native', 'Firebase', 'MongoDB', 'Redux']
  },
  {
    id: 3,
    title: 'Financial Dashboard',
    slug: 'financial-dashboard',
    description: 'An interactive financial dashboard with real-time data visualization and predictive analytics.',
    image: 'https://via.placeholder.com/800x600?text=Financial+Dashboard',
    category: 'Web Development',
    category_slug: 'web-development',
    client: 'InvestSmart Financial',
    year: 2023,
    demo_url: 'https://investsmart-dash.com',
    featured: false,
    technologies: ['React', 'Node.js', 'GraphQL', 'TypeScript']
  },
  {
    id: 4,
    title: 'Restaurant Ordering System',
    slug: 'restaurant-ordering-system',
    description: 'A complete digital ordering system for restaurants with real-time kitchen updates and customer interface.',
    image: 'https://via.placeholder.com/800x600?text=Restaurant+Ordering+System',
    category: 'Web Development',
    category_slug: 'web-development',
    client: 'Culinary Innovations',
    year: 2022,
    demo_url: 'https://culinary-order-demo.com',
    featured: false,
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.io']
  },
  {
    id: 5,
    title: 'Travel Experience Platform',
    slug: 'travel-experience-platform',
    description: 'A modern travel platform focusing on unique experiences with immersive content and booking capabilities.',
    image: 'https://via.placeholder.com/800x600?text=Travel+Experience+Platform',
    category: 'UI/UX Design',
    category_slug: 'ui-ux-design',
    client: 'Wanderlust Travels',
    year: 2023,
    demo_url: 'https://wanderlust-experiences.com',
    featured: true,
    technologies: ['React', 'Node.js', 'MongoDB', 'Figma', 'Tailwind CSS']
  },
  {
    id: 6,
    title: 'Productivity Suite',
    slug: 'productivity-suite',
    description: 'A comprehensive productivity tool suite with task management, time tracking, and team collaboration features.',
    image: 'https://via.placeholder.com/800x600?text=Productivity+Suite',
    category: 'Web Development',
    category_slug: 'web-development',
    client: 'Efficiency Works',
    year: 2022,
    demo_url: 'https://efficiency-suite.com',
    featured: false,
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'TypeScript']
  } */
];

const mockCategories = [ /*
  { id: 1, name: 'Web Development', slug: 'web-development' },
  { id: 2, name: 'Mobile App', slug: 'mobile-app' },
  { id: 3, name: 'UI/UX Design', slug: 'ui-ux-design' },
  { id: 4, name: 'E-commerce', slug: 'e-commerce' } */
];

const mockTestimonials = [ /*
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CTO',
    company: 'TechVision',
    image: 'https://via.placeholder.com/150x150?text=SJ',
    quote: 'Working with Essa was a game-changer for our company. He delivered a complex web application that exceeded our expectations in terms of performance and user experience. His technical expertise and attention to detail are truly impressive.',
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Founder',
    company: 'StartupLaunch',
    image: 'https://via.placeholder.com/150x150?text=MC',
    quote: 'Essa helped us transform our startup idea into a polished digital product. His ability to understand our business needs and translate them into a functional application was remarkable. I highly recommend his services to any startup founder.',
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: 'Rebecca Torres',
    position: 'Marketing Director',
    company: 'GrowthBrand',
    image: 'https://via.placeholder.com/150x150?text=RT',
    quote: 'Our e-commerce platform needed a complete overhaul, and Essa delivered beyond our expectations. The new site is not only visually stunning but has significantly improved our conversion rates. His technical skills combined with business acumen make him an invaluable partner.',
    rating: 5,
    featured: false
  },
  {
    id: 4,
    name: 'David Williams',
    position: 'Product Manager',
    company: 'EnterpriseApp',
    image: 'https://via.placeholder.com/150x150?text=DW',
    quote: 'The work on our enterprise dashboard was exceptional. He created an intuitive interface that simplified complex data visualization for our users. His communication throughout the project was clear and professional, making the entire process smooth and efficient.',
    rating: 4,
    featured: false
  } */
];

/**
 * Determine if we should use mock data or real API
 * This can be toggled during development
 */
// For now, always use mock data until the backend is ready
const USE_MOCK_DATA = true;

/**
 * Fetch all projects with optional category filter
 * @param {string|null} category - Category slug to filter by (optional)
 * @returns {Promise<Array>} - Array of project objects
 */
export const fetchProjects = async (category = null) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (category) {
      return mockProjects.filter(project => project.category_slug === category);
    }
    return mockProjects;
  }
  
  const endpoint = category 
    ? `/portfolio?category=${encodeURIComponent(category)}` 
    : '/portfolio';
  
  const response = await fetchApi(endpoint);
  return response.data;
};

/**
 * Fetch a specific project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object|null>} - Project object or null if not found
 */
export const fetchProjectBySlug = async (slug) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const project = mockProjects.find(p => p.slug === slug);

    if (!project) {
      return null;
    }

    // Add related projects (for mock data)
    const sameCategory = mockProjects.filter(p =>
        p.category_slug === project.category_slug && p.id !== project.id
    );

    project.relatedProjects = sameCategory
        .slice(0, 3)
        .map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          // Handle both old and new image format for related projects
          image: Array.isArray(p.images) ? p.images[0] : p.image
        }));

    // For backward compatibility, set image property to first image in array
    if (Array.isArray(project.images) && !project.image) {
      project.image = project.images[0];
    }

    return project;
  }

  try {
    const response = await fetchApi(`/portfolio/${slug}`);
    // Ensure backward compatibility for API responses
    if (response.data.images && !response.data.image) {
      response.data.image = response.data.images[0];
    }
    return response.data;
  } catch (error) {
    if (error.message.includes('404')) {
      return null;
    }
    throw error;
  }
};

/**
 * Fetch featured projects
 * @param {number} limit - Maximum number of projects to return
 * @returns {Promise<Array>} - Array of featured project objects
 */
export const fetchFeaturedProjects = async (limit = 3) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockProjects
      .filter(project => project.featured)
      .slice(0, limit);
  }
  
  const response = await fetchApi(`/portfolio/featured?limit=${limit}`);
  return response.data;
};

/**
 * Fetch all project categories
 * @returns {Promise<Array>} - Array of category objects
 */
export const fetchCategories = async () => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockCategories;
  }
  
  const response = await fetchApi('/portfolio/categories');
  return response.data;
};

/**
 * Fetch testimonials
 * @param {boolean} featuredOnly - Whether to fetch only featured testimonials
 * @param {number} limit - Maximum number of testimonials to return
 * @returns {Promise<Array>} - Array of testimonial objects
 */
export const fetchTestimonials = async (featuredOnly = false, limit = 4) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredTestimonials = mockTestimonials;
    
    if (featuredOnly) {
      filteredTestimonials = filteredTestimonials.filter(t => t.featured);
    }
    
    return filteredTestimonials.slice(0, limit);
  }
  
  const endpoint = featuredOnly 
    ? `/testimonials/featured?limit=${limit}` 
    : `/testimonials?limit=${limit}`;
  
  const response = await fetchApi(endpoint);
  return response.data;
};

/**
 * Submit contact form
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Response data
 */
export const submitContactForm = async (formData) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate validation
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('Please fill in all required fields');
    }
    
    // Simulate successful submission
    return {
      success: true,
      message: 'Message sent successfully',
      data: {
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString()
      }
    };
  }
  
  const response = await fetchApi('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  
  return response;
};

/**
 * Subscribe to newsletter
 * @param {string} email - Email address
 * @returns {Promise<Object>} - Response data
 */
export const subscribeNewsletter = async (email) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate validation
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      throw new Error('Please provide a valid email address');
    }
    
    // Simulate successful subscription
    return {
      success: true,
      message: 'Subscribed successfully'
    };
  }
  
  const response = await fetchApi('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  
  return response;
};

export default {
  fetchProjects,
  fetchProjectBySlug,
  fetchFeaturedProjects,
  fetchCategories,
  fetchTestimonials,
  submitContactForm,
  subscribeNewsletter
};