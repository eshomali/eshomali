// src/pages/NotFoundPage.jsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Essa Shomali</title>
        <meta name="description" content="The page you are looking for doesn't exist." />
      </Helmet>
      
      <section className="not-found-section">
        <div className="container">
          <div className="not-found-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
            
            <div className="not-found-actions">
              <Button to="/" variant="primary" size="large">
                Go Home
              </Button>
              <Button to="/portfolio" variant="outline" size="large">
                View Portfolio
              </Button>
            </div>
            
            <div className="not-found-links">
              <p>Or check out these popular pages:</p>
              <ul>
                <li><Link to="/about">About Me</Link></li>
                <li><Link to="/services/web-development">Web Development Services</Link></li>
                <li><Link to="/services/mobile-apps">Mobile App Development</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="not-found-illustration">
            {/* SVG illustration for 404 page */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 500 500" 
              width="400" 
              height="400"
              aria-hidden="true"
            >
              <g>
                <path
                  d="M389.5,214.7c-30-53.3-93.3-82.2-152.8-69.6c-39.8,8.5-73.4,36.5-89.9,75s-15.3,83.6,4.6,120.9
                  c38.6,72.6,130.1,98.3,202.7,59.7C427.1,361,428.1,284.7,389.5,214.7z"
                  fill="#f2f2f2"
                />
                <circle cx="234.5" cy="273.3" r="43.4" fill="#6366f1" />
                <path
                  d="M172.2,270.3c0,0-4.9,61,48.8,72.8l-54.4,45.6L89.2,312L172.2,270.3z"
                  fill="#6366f1"
                />
                <path
                  d="M123.3,239.7c0,0-60.5,8.9-65.4,65.4l-48.8-50.6l88.6-81.4L123.3,239.7z"
                  fill="#2f2e41"
                />
                <path
                  d="M316.8,352.2c0,0,18.3,24.4,12.2,44l1.2,29.3c0,0-3.7,15.9-1.8,18.9c1.8,3,2.4,19.5,2.4,19.5h9.8l2.4-20.1
                  l3-32.3c0,0,4.9-30.5,0-42.1s-8.6-21-8.6-21l-20.7,3.6V352.2z"
                  fill="#2f2e41"
                />
                <path
                  d="M173.4,370.5c0,0-13.4,27.4-3.7,44.6l3,29.3c0,0,6.1,15.2,4.9,18.3c-1.2,3.1-0.6,19.5-0.6,19.5h-9.8l-4.3-19.5
                  l-8-30.5c0,0-9.8-29.3-7.3-41.6s4.3-22.6,4.3-22.6l21.3,0.6L173.4,370.5z"
                  fill="#2f2e41"
                />
                <circle cx="175.2" cy="179.9" r="24.4" fill="#a0616a" />
                <path
                  d="M145.9,177.9c0,0,3.7,29.9,1.8,33c-1.8,3-24.4,4.9-24.4,4.9v-31.7L145.9,177.9z"
                  fill="#a0616a"
                />
                <path
                  d="M196.5,355.2L158,361.4c0,0-8.6,24.4-7.9,42.7s2.4,26.8,2.4,26.8l-20.7-1.2c0,0-5.5-29.3-14-32.3
                  c-8.5-3-10.4-6.1-10.4-6.1s-3.7-13.4-4.9-25c-1.2-11.6,2.4-25,2.4-25L79.4,325l12.8-92.9l40.9-19.5l59.8,37.8l-12.2,25.6l15.9,78.9
                  V355.2z"
                  fill="#2f2e41"
                />
                <path
                  d="M179.4,209c0,0,6.1,19.5-6.1,22.6l-30.5,6.7c0,0-35.4,0-40.3-3c-4.9-3-15.3-7.9-15.3-7.9s3.7-22,1.2-26.2
                  c0,0,39-15.3,42.1-17.7c3-2.4,23.2-6.7,27.4-1.8C162.3,186.4,179.4,209,179.4,209z"
                  fill="#6366f1"
                />
                <path
                  d="M162.9,119.6c0,0-3.7-1.8-6.1,0c-2.4,1.8-28.7,14-32.9,12.2c-4.2-1.8-9.1-9.8-9.1-9.8s-10.4,4.9-14,1.8
                  c-3.7-3,3-15.9,6.1-18.3c3-2.4,9.8-10.4,9.8-10.4s0-7.9,3-7.9c3,0,4.3-1.2,5.5-5.5c1.2-4.3,3.1-8.9,14.6-8.9s19.5,11.6,19.5,11.6
                  c0.6,1.2,5.5,3,6.1,6.7c0.6,3.7,1.2,8.5,3,8.5s2.4,5.5,1.8,7.9c-0.6,2.4-3,5.5-3,5.5S167.8,120.2,162.9,119.6z"
                  fill="#2f2e41"
                />
                <path
                  d="M142.2,214.5c0,0-9.1,1.8-9.8,3.1c-0.6,1.2-1.2,3.6-1.2,3.6l-40.9,56.2c0,0-30.5,21.3-25.6,36.6
                  c4.9,15.3,34.1,5.5,34.1,5.5s54.9-42.1,61-49.4s9.1-13.4,9.1-13.4s8.5-32.9,3.7-32.9l-6.1-7.3C166.6,216.3,142.2,214.5,142.2,214.5z"
                  fill="#a0616a"
                />
                <path
                  d="M199.5,208.4c0,0,12.2,1.2,14,4.3c1.8,3.1,23.2,53.7,23.2,53.7l15.9,24.4c0,0,17.7,28.7,23.8,31.7
                  c6.1,3.1,18.9,9.8,11.6,17.7c-7.3,7.9-20.7,2.4-20.7,2.4s-29.3-22-44-40.9c-14.6-18.9-25-46.4-25-46.4L199.5,208.4z"
                  fill="#a0616a"
                />
                <path
                  d="M128.8,227.3c0,0-20.9-20.5-25.2-19.9c-4.3,0.6-25,8.5-29.9,11.6s-11,4.3-11,4.3l11,48.2l-11.6,20.7
                  c0,0-11,12.2-4.9,14c6.1,1.8,14-5.5,14-5.5s21.3-15.9,23.2-22.6c1.8-6.7,24.4-25,24.4-25L128.8,227.3z"
                  fill="#a0616a"
                />
                <path
                  d="M179.4,192c0,0,12.8,14.6,22,14c9.1-0.6,20.7-6.1,20.7-6.1s41.5-1.8,18.9,48.2c-22.6,50-31.1,74.4-31.1,74.4
                  L197,315.8l-9.1-50.6l-15.3-33.5L179.4,192z"
                  fill="#6366f1"
                />
              </g>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;