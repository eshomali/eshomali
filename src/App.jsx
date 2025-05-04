// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectPage from './pages/ProjectPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading delay (remove in production)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Initial loading screen
    if (loading) {
        return (
            <div className="preloader">
                <div className="preloader-inner">
                    <div className="loader"></div>
                    <div className="loading-text">Loading</div>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <HomePage />
                    </Layout>
                }
            />
            <Route
                path="/about"
                element={
                    <Layout>
                        <AboutPage />
                    </Layout>
                }
            />
            <Route
                path="/portfolio"
                element={
                    <Layout>
                        <PortfolioPage />
                    </Layout>
                }
            />
            <Route
                path="/portfolio/:slug"
                element={
                    <Layout>
                        <ProjectPage />
                    </Layout>
                }
            />
            <Route
                path="/pricing"
                element={
                    <Layout>
                        <PricingPage />
                    </Layout>
                }
            />
            <Route
                path="/contact"
                element={
                    <Layout>
                        <ContactPage />
                    </Layout>
                }
            />
            <Route
                path="*"
                element={
                    <Layout>
                        <NotFoundPage />
                    </Layout>
                }
            />
        </Routes>
    );
}

export default App;