import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../../firebase";
import * as routes from "../../constants/routes";
import * as analytics from "./../../analytics/analytics";

import logo from "./../../assets/images/logo.png";

const SignUpPage = ({ history }) => (
    <div className="modern-auth-container">
        <SignUpForm history={history} />
    </div>
);

const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        const { history } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.uid, username, email)
                    .then(() => {
                        if (!authUser.emailVerified) {
                            authUser
                                .sendEmailVerification()
                                .then(function() {
                                    console.log("Verification email sent");
                                })
                                .catch(function(error) {
                                    console.error("Error sending verification email:", error);
                                });
                        }
                        
                        auth.doSignOut()
                            .then(() => {
                                this.setState(() => ({ ...INITIAL_STATE }));
                                history.push(routes.SIGN_IN);
                                alert("Account created successfully! Please check your email for a confirmation link before signing in.");
                            })
                            .catch(error => {
                                console.error("Error signing out:", error);
                                this.setState(() => ({ ...INITIAL_STATE }));
                                history.push(routes.SIGN_IN);
                            });
                    })
                    .catch(error => {
                        this.setState(byPropKey("error", error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey("error", error));
            });

        event.preventDefault();
    };

    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === "" || email === "" || username === "";

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
                                Join <span className="gradient-text">Expense Manager</span>
                            </h1>
                            <p className="brand-subtitle">
                                Start your journey to financial freedom. Create your account and 
                                begin tracking your expenses with our powerful tools.
                            </p>
                            
                            <div className="brand-features">
                                <div className="feature-item">
                                    <i className="fa fa-rocket"></i>
                                    <span>Get Started Free</span>
                                </div>
                                <div className="feature-item">
                                    <i className="fa fa-clock"></i>
                                    <span>Setup in 2 Minutes</span>
                                </div>
                                <div className="feature-item">
                                    <i className="fa fa-gift"></i>
                                    <span>No Credit Card</span>
                                </div>
                            </div>

                            <div className="brand-stats">
                                <div className="stat">
                                    <span className="stat-number">1K+</span>
                                    <span className="stat-label">Happy Users</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">100k+</span>
                                    <span className="stat-label">Total Saved</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">4.9★</span>
                                    <span className="stat-label">Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Sign Up Form */}
                    <div className="auth-form-section">
                        <div className="form-container">
                            <div className="form-header">
                                <h2>Create Your Account</h2>
                                <p>Join thousands of users who are already managing their finances better.</p>
                            </div>

                            <form onSubmit={this.onSubmit} className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="username">Full Name</label>
                                    <div className="input-wrapper">
                                        <i className="fa fa-user input-icon"></i>
                                        <input
                                            id="username"
                                            value={username}
                                            onChange={event => this.setState(byPropKey("username", event.target.value))}
                                            type="text"
                                            placeholder="   Enter your full name"
                                            required
                                        />
                                    </div>
                                </div>

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
                                    <label htmlFor="passwordOne">Password</label>
                                    <div className="input-wrapper">
                                        <i className="fa fa-lock input-icon"></i>
                                        <input
                                            id="passwordOne"
                                            value={passwordOne}
                                            onChange={event => this.setState(byPropKey("passwordOne", event.target.value))}
                                            type="password"
                                            placeholder="   Create a strong password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="passwordTwo">Confirm Password</label>
                                    <div className="input-wrapper">
                                        <i className="fa fa-lock input-icon"></i>
                                        <input
                                            id="passwordTwo"
                                            value={passwordTwo}
                                            onChange={event => this.setState(byPropKey("passwordTwo", event.target.value))}
                                            type="password"
                                            placeholder="   Confirm your password"
                                            required
                                        />
                                    </div>
                                </div>

                                <button 
                                    disabled={isInvalid} 
                                    type="submit" 
                                    className="submit-btn"
                                >
                                    <span>Create Account</span>
                                    <i className="fa fa-arrow-right"></i>
                                </button>

                                {error && (
                                    <div className="error-message">
                                        <i className="fa fa-exclamation-circle"></i>
                                        <span>{error.message}</span>
                                    </div>
                                )}

                                <div className="divider">
                                    <span>or</span>
                                </div>

                                <div className="signin-prompt">
                                    <p>
                                        Already have an account? 
                                        <Link to={routes.SIGN_IN} className="signin-link">
                                            Sign in here
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

const style = {
    textAlign: "center"
};

const StyleInSignUp = {
    marginTop: "-10px",
    textAlign: "center"
};

const SignUpLink = () => (
    <p style={style}>
        Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
