// src/pages/HomePage.jsx
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import PortfolioHome from '../components/sections/PortfolioHome';
import ContactHome from '../components/sections/ContactHome';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Essa Shomali | Professional App Developer</title>
        <meta 
          name="description" 
          content="Essa Shomali - Professional app developer helping businesses create stunning, high-performance web and mobile applications."
        />
        <meta 
          name="keywords" 
          content="app developer, web development, mobile apps, UI/UX design, react developer, full stack developer" 
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eshomali.com/" />
        <meta property="og:title" content="Essa Shomali | Professional App Developer" />
        <meta 
          property="og:description" 
          content="Professional app developer helping businesses create stunning, high-performance web and mobile applications." 
        />
        <meta property="og:image" content="https://eshomali.com/images/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://eshomali.com/" />
        <meta name="twitter:title" content="Essa Shomali | Professional App Developer" />
        <meta 
          name="twitter:description" 
          content="Professional app developer helping businesses create stunning, high-performance web and mobile applications." 
        />
        <meta name="twitter:image" content="https://eshomali.com/images/og-image.jpg" />
      </Helmet>
      
      <Hero />
      
      <About />
      
      <Services />
      
      <ContactHome />
    </>
  );
};

export default HomePage;