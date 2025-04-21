# Essa Shomali - Professional Portfolio Website

A professional portfolio website for showcasing app development projects and services. Built with React, Node.js/Express, and MySQL.

## 🚀 Features

- Modern, responsive design optimized for all devices
- Lighthouse performance score of 90+
- WCAG 2.1 accessibility compliant
- Interactive project portfolio with filtering
- Contact form with email notifications
- Client testimonials
- Services showcase
- Professional about section
- SEO optimized

## 🛠️ Technology Stack

### Frontend
- React 19
- React Router for navigation
- CSS with custom variables for theming
- Responsive design with media queries
- Animations and transitions
- SEO optimization with React Helmet

### Backend
- Node.js with Express
- MySQL database
- RESTful API architecture
- Nodemailer for email handling
- Express Rate Limit for API protection
- Helmet for security headers
- Compression for response optimization

## 📋 Requirements

- Node.js 18+
- MySQL 8.0+
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eshomali-website.git
   cd eshomali-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Database
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=eshomali_portfolio
   
   # Email
   MAIL_HOST=your_smtp_host
   MAIL_PORT=your_smtp_port
   MAIL_USER=your_smtp_username
   MAIL_PASS=your_smtp_password
   MAIL_FROM=contact@eshomali.com
   ```

4. Set up the database:
   ```bash
   npm run db:setup
   ```
   (or manually run the SQL script in `db/schema.sql`)

## 🚀 Development

Run the frontend and backend in development mode:

```bash
npm run dev:full
```

Or run them separately:

```bash
# Frontend only
npm run dev

# Backend only
npm run server:dev
```

## 🏗️ Building for Production

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
eshomali-website/
├── public/             # Static assets
├── src/                # Frontend React code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and CSS variables
│   ├── utils/          # Utility functions and API
│   ├── App.jsx         # Main React component
│   └── main.jsx        # Entry point
├── server/             # Backend Node.js/Express code
│   ├── config/         # Server configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Server utilities
│   └── server.js       # Server entry point
├── db/                 # Database scripts
└── package.json        # Project dependencies and scripts
```

## 📱 Responsive Design

The website is fully responsive with the following breakpoints:

- Mobile: up to 576px
- Tablet: 577px to 768px
- Laptop: 769px to 992px
- Desktop: 993px to 1200px
- Large Desktop: 1201px and above

## ♿ Accessibility

This website adheres to WCAG 2.1 AA standards, featuring:

- Semantic HTML
- Proper heading hierarchy
- Adequate color contrast
- ARIA attributes where needed
- Keyboard navigation
- Screen reader compatibility
- Focus indicators

## 🔒 Security

- HTTP Security Headers via Helmet
- Rate limiting on sensitive endpoints
- Input validation
- XSS protection
- CSRF protection
- Secure email handling

## 📈 Performance Optimization

- Code splitting and lazy loading
- Image optimization
- CSS minification
- Gzip compression
- Response caching
- Efficient API queries

## 🔄 Continuous Integration/Deployment

Set up CI/CD pipeline with GitHub Actions:

1. Run tests
2. Build frontend
3. Deploy to hosting platform

## 🧪 Testing

- Unit tests for components
- API endpoint tests
- Accessibility tests
- Performance tests

## 📃 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Essa Shomali - contact@eshomali.com

Project Link: [https://github.com/yourusername/eshomali-website](https://github.com/yourusername/eshomali-website)