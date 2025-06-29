import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
// import logo from '../../assets/images/logo.png';

const LandingPage = () => {
    return (
        <div className="modern-landing">
            {/* Removed Logo Header */}
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                        <div className="shape shape-5"></div>
                        <div className="shape shape-6"></div>
                        <div className="shape shape-7"></div>
                    </div>
                    <div className="gradient-overlay"></div>
                </div>
                
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">
                            <i className="fa fa-star"></i>
                            <span>Trusted by 10,000+ users</span>
                        </div>
                        <h1 className="hero-title">
                            Master Your <span className="gradient-text">Finances</span> with Intelligence
                        </h1>
                        <p className="hero-subtitle">
                            Transform your financial life with our AI-powered expense tracker. 
                            Get insights, save money, and achieve your financial goals faster than ever.
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">$2.5M+</span>
                                <span className="stat-label">Saved by Users</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">95%</span>
                                <span className="stat-label">Accuracy Rate</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">24/7</span>
                                <span className="stat-label">Support</span>
                            </div>
                        </div>
                        <div className="hero-buttons">
                            <Link to={routes.SIGN_UP} className="cta-button primary">
                                <i className="fa fa-rocket"></i>
                                Start Free Trial
                                <span className="button-glow"></span>
                            </Link>
                            <Link to={routes.SIGN_IN} className="cta-button secondary">
                                <i className="fa fa-sign-in"></i>
                                Sign In
                            </Link>
                        </div>
                        <div className="hero-trust">
                            <div className="trust-item">
                                <i className="fa fa-shield-alt"></i>
                                <span>Bank-level Security</span>
                            </div>
                            <div className="trust-item">
                                <i className="fa fa-lock"></i>
                                <span>Privacy First</span>
                            </div>
                            <div className="trust-item">
                                <i className="fa fa-mobile"></i>
                                <span>Mobile Optimized</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        <div className="dashboard-preview">
                            <div className="preview-header">
                                <div className="preview-dot red"></div>
                                <div className="preview-dot yellow"></div>
                                <div className="preview-dot green"></div>
                                <div className="preview-title">Expense Dashboard</div>
                            </div>
                            <div className="preview-content">
                                <div className="preview-chart">
                                    <div className="chart-bar" style={{height: '60%'}}></div>
                                    <div className="chart-bar" style={{height: '80%'}}></div>
                                    <div className="chart-bar" style={{height: '45%'}}></div>
                                    <div className="chart-bar" style={{height: '90%'}}></div>
                                    <div className="chart-bar" style={{height: '70%'}}></div>
                                    <div className="chart-bar" style={{height: '55%'}}></div>
                                </div>
                                <div className="preview-stats">
                                    <div className="stat-item">
                                        <span className="stat-value">$2,450</span>
                                        <span className="stat-label">This Month</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">$18,200</span>
                                        <span className="stat-label">Total Saved</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">85%</span>
                                        <span className="stat-label">Budget Used</span>
                                    </div>
                                </div>
                                <div className="preview-categories">
                                    <div className="category-item">
                                        <div className="category-color food"></div>
                                        <span>Food & Dining</span>
                                        <span className="category-amount">$450</span>
                                    </div>
                                    <div className="category-item">
                                        <div className="category-color transport"></div>
                                        <span>Transport</span>
                                        <span className="category-amount">$320</span>
                                    </div>
                                    <div className="category-item">
                                        <div className="category-color shopping"></div>
                                        <span>Shopping</span>
                                        <span className="category-amount">$280</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            Everything You Need to <span className="gradient-text">Succeed</span>
                        </h2>
                        <p className="section-subtitle">
                            Powerful features designed to make expense management effortless and insightful
                        </p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-chart-pie"></i>
                            </div>
                            <h3>Smart Analytics</h3>
                            <p>AI-powered insights that help you understand spending patterns and identify saving opportunities.</p>
                            <div className="feature-highlight">
                                <i className="fa fa-lightbulb"></i>
                                <span>Get personalized recommendations</span>
                            </div>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-calendar-alt"></i>
                            </div>
                            <h3>Daily Tracking</h3>
                            <p>Track every expense with intelligent categorization and smart reminders that never let you forget.</p>
                            <div className="feature-highlight">
                                <i className="fa fa-bell"></i>
                                <span>Smart notifications</span>
                            </div>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-piggy-bank"></i>
                            </div>
                            <h3>Savings Goals</h3>
                            <p>Set realistic goals and watch your savings grow with our dedicated savings tracker and progress visualization.</p>
                            <div className="feature-highlight">
                                <i className="fa fa-target"></i>
                                <span>Goal tracking & milestones</span>
                            </div>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-mobile-alt"></i>
                            </div>
                            <h3>Mobile First</h3>
                            <p>Access your finances anywhere with our responsive design that works perfectly on all devices.</p>
                            <div className="feature-highlight">
                                <i className="fa fa-sync"></i>
                                <span>Real-time sync</span>
                            </div>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-cloud"></i>
                            </div>
                            <h3>Cloud Sync</h3>
                            <p>Your data is safely stored in the cloud and automatically syncs across all your devices instantly.</p>
                            <div className="feature-highlight">
                                <i className="fa fa-shield"></i>
                                <span>End-to-end encryption</span>
                            </div>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-lock"></i>
                            </div>
                            <h3>Bank-Level Security</h3>
                            <p>Your financial data is protected with enterprise-grade security measures and regular security audits.</p>
                            <div className="feature-highlight">
                                <i className="fa fa-check-circle"></i>
                                <span>GDPR compliant</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                        <p className="section-subtitle">
                            Get started in minutes with our simple 3-step process
                        </p>
                    </div>
                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">1</div>
                            <div className="step-icon">
                                <i className="fa fa-user-plus"></i>
                            </div>
                            <h3>Create Account</h3>
                            <p>Sign up in 30 seconds with just your email. No credit card required.</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-icon">
                                <i className="fa fa-plus-circle"></i>
                            </div>
                            <h3>Add Expenses</h3>
                            <p>Start tracking your expenses with our intuitive interface. Add categories and set budgets.</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-icon">
                                <i className="fa fa-chart-line"></i>
                            </div>
                            <h3>Get Insights</h3>
                            <p>View detailed analytics, identify spending patterns, and optimize your finances.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <div className="cta-text">
                            <h2>Ready to Transform Your Financial Life?</h2>
                            <p>Join thousands of users who have already saved millions and achieved their financial goals.</p>
                            <div className="cta-features">
                                <div className="cta-feature">
                                    <i className="fa fa-check"></i>
                                    <span>Free forever plan available</span>
                                </div>
                                <div className="cta-feature">
                                    <i className="fa fa-check"></i>
                                    <span>No credit card required</span>
                                </div>
                                <div className="cta-feature">
                                    <i className="fa fa-check"></i>
                                    <span>Cancel anytime</span>
                                </div>
                            </div>
                        </div>
                        <div className="cta-actions">
                            <Link to={routes.SIGN_UP} className="cta-button primary large">
                                <i className="fa fa-rocket"></i>
                                Start Your Free Trial
                                <span className="button-glow"></span>
                            </Link>
                            <Link to={routes.SIGN_IN} className="cta-button secondary large">
                                <i className="fa fa-sign-in"></i>
                                Sign In to Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;