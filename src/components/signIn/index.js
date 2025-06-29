import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { SignUpLink } from "../signUp/index";
import { auth } from "../../firebase";
import * as routes from "../../constants/routes";
import * as analytics from "./../../analytics/analytics";

import logo from "./../../assets/images/logo.png";
import homeScreen from "./../../assets/images/Home1.png";
import monthScreen from "./../../assets/images/MONTHLY_NIGHT_MODE.png";
import statisticsScreen from "./../../assets/images/STATISTICS_NIGHT_MODE.png";
import savingsScreen from "./../../assets/images/SAVINGS_NIGHT.png";
import homeMobile from "./../../assets/images/HOME_MOBILE.png";
import monthMobile from "./../../assets/images/MONTH_MOBILE.png";
import statsMobile from "./../../assets/images/STATISTICS_MOBILE.png";
import travel from "./../../assets/images/travel.png";

import firebase from "firebase";

const SignInPage = ({ history }) => (
    <div className="modern-auth-container">
        <SignInForm history={history} />
    </div>
);

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    callGoogleSignIn = () => {
        const { history } = this.props;

        let provider = new firebase.auth.GoogleAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                let token = result.credential.accessToken;
                let user = result.user;
                history.push(routes.HOME);
            })
            .catch(error => {
                let errorMessage = error.message;
                alert(errorMessage, "Retry !!!");
            });
    };

    onSubmit = event => {
        const { email, password } = this.state;
        const { history } = this.props;

        auth.doSignInWithEmailAndPassword(email.trim(), password)
            .then(authUser => {
                const isEmailVerified = authUser.emailVerified !== undefined ? authUser.emailVerified : true;
                
                if (authUser && isEmailVerified) {
                    this.setState(() => ({ ...INITIAL_STATE }));
                    history.push(routes.HOME);
                } else {
                    history.push(routes.USER_VERIFICATION);
                }
            })
            .catch(error => {
                this.setState(byPropKey("error", error));
            });

        event.preventDefault();
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === "" || email === "";

        return (
            <div className="auth-page">
                {/* Background Animation */}
                <div className="auth-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                        <div className="shape shape-5"></div>
                    </div>
                    <div className="gradient-overlay"></div>
                </div>

                <div className="auth-container">
                    {/* Left Side - Brand & Info */}
                    <div className="auth-brand-section">
                        <div className="brand-content">
                            <div className="brand-logo">
                                {/* <img src={logo} alt="Expense Manager" /> */}
                            </div>
                            <h1 className="brand-title">
                                Welcome to <span className="gradient-text">Expense Manager</span>
                            </h1>
                            <p className="brand-subtitle">
                                Take control of your finances with our intelligent expense tracker. 
                                Monitor, analyze, and optimize your spending habits effortlessly.
                            </p>
                            
                            <div className="brand-features">
                                <div className="feature-item">
                                    <i className="fa fa-chart-line"></i>
                                    <span>Smart Analytics</span>
                                </div>
                                <div className="feature-item">
                                    <i className="fa fa-mobile"></i>
                                    <span>Mobile Friendly</span>
                                </div>
                                <div className="feature-item">
                                    <i className="fa fa-shield-alt"></i>
                                    <span>Secure & Private</span>
                                </div>
                            </div>

                            <div className="brand-stats">
                                <div className="stat">
                                    <span className="stat-number">1K+</span>
                                    <span className="stat-label">Active Users</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">100k+</span>
                                    <span className="stat-label">Saved</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">98%</span>
                                    <span className="stat-label">Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Sign In Form */}
                    <div className="auth-form-section">
                        <div className="form-container">
                            <div className="form-header">
                                <h2>Sign In to Your Account</h2>
                                <p>Welcome back! Please enter your details to continue.</p>
                            </div>

                            <form onSubmit={this.onSubmit} className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="input-wrapper">
                                        <i className="fa fa-envelope input-icon"></i>
                                        <input
                                            id="email"
                                            value={email}
                                            onChange={event => this.setState(byPropKey("email", event.target.value))}
                                            type="email"
                                            placeholder="   Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-wrapper">
                                        <i className="fa fa-lock input-icon"></i>
                                        <input
                                            id="password"
                                            value={password}
                                            onChange={event => this.setState(byPropKey("password", event.target.value))}
                                            type="password"
                                            placeholder="   Enter your password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-options">
                                    <Link to={routes.PASSWORD_FORGET} className="forgot-link">
                                        Forgot password?
                                    </Link>
                                </div>

                                <button 
                                    disabled={isInvalid} 
                                    type="submit" 
                                    className="submit-btn"
                                >
                                    <span>Sign In</span>
                                    <i className="fa fa-arrow-right"></i>
                                </button>

                                {error && (
                                    <div className="error-message">
                                        <i className="fa fa-exclamation-circle"></i>
                                        <span>{error.message}</span>
                                    </div>
                                )}

                                <div className="divider">
                                    <span>or continue with</span>
                                </div>

                                <button 
                                    type="button" 
                                    onClick={this.callGoogleSignIn} 
                                    className="google-btn"
                                >
                                    <span className="google-logo">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <g>
                                                <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.48c-.24 1.28-.97 2.36-2.07 3.09v2.56h3.34c1.95-1.8 3.08-4.45 3.08-7.44z"/>
                                                <path fill="#34A853" d="M10 20c2.7 0 4.96-.89 6.61-2.41l-3.34-2.56c-.93.62-2.12.99-3.27.99-2.52 0-4.66-1.7-5.42-3.99H1.13v2.5C2.84 17.98 6.17 20 10 20z"/>
                                                <path fill="#FBBC05" d="M4.58 12.03A5.99 5.99 0 0 1 4.1 10c0-.7.12-1.38.32-2.03V5.47H1.13A9.98 9.98 0 0 0 0 10c0 1.64.39 3.19 1.13 4.53l3.45-2.5z"/>
                                                <path fill="#EA4335" d="M10 4c1.48 0 2.8.51 3.85 1.56l2.95-2.95C15.9 1.56 14.52 1 13.04 1H10z"/>
                                            </g>
                                        </svg>
                                    </span>
                                    <span>Sign in with Google</span>
                                </button>

                                <div className="signup-prompt">
                                    <p>
                                        Don't have an account? 
                                        <Link to={routes.SIGN_UP} className="signup-link">
                                            Sign up for free
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export { SignInForm };
