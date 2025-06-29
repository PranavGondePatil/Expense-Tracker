import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';

import SignOutButton from "../SignOut/index";
import * as routes from "../../constants/routes";

const NavigationAuth = props => {
    const burgerToggle = () => {
        const linksEl = document.querySelector(".narrowLinks");
        if (linksEl.style.display === "block") {
            linksEl.style.display = "none";
        } else {
            linksEl.style.display = "block";
        }
    };

    const nightMode = { background: "#00252C", color: "#F4D680" };

    const nightModeHeader = {
        background: "#00252C",
        color: "#9AD3CB",
        fontSize: "23px!important"
    };

    const mightModeToggle = { background: "#00252C", color: "#F4D680" };

    const daymode = { background: "#f8f9fa", color: "#2c3e50" };
    const dayModeLink = { color: "#34495e", fontWeight: "500" };
    const nightModeLink = { background: "#00252C", color: "#F4D680", fontWeight: "500" };

    return (
        <nav style={props.settings.mode === "night" ? nightModeHeader : daymode} className="modern-navbar">
            <div className="navWide">
                <ul className="navbar-nav">
                    <div className="brand-container">
                        <h2 className="navbar-brand modern-brand">
                            <span className="brand-icon">
                                <img src={logo} alt="Brand Logo" style={{ height: '40px', width: '40px', borderRadius: '12px', background: '#b2f7cc' }} />
                            </span>
                            <span className="brand-text">
                                <span className="brand-main">Expense</span>
                                <span className="brand-sub">Manager</span>
                            </span>
                        </h2>
                    </div>
                </ul>
                <div className="wideDiv">
                    <Link
                        className={`nav-link ${window.location.pathname === "/home" ? "active" : "inactive"}`}
                        to={routes.HOME}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Home
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/month-view" ? "active" : "inactive"}`}
                        to={routes.MONTH_VIEW}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Monthly
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/daily-view" ? "active" : "inactive"}`}
                        to={routes.DAILY_VIEW}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Daily
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/filter-view" ? "active" : "inactive"}`}
                        to={routes.FILTER_VIEW}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        filter
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/statistics" ? "active" : "inactive"}`}
                        to={routes.STATISTICS_VIEW}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Stats
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/loan" ? "active" : "inactive"}`}
                        to={routes.LOAN_VIEW}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Loan
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/savings" ? "active" : "inactive"}`}
                        to={routes.SAVINGS_VIEW}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Savings
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/settings" ? "active" : "inactive"}`}
                        to={routes.SETTINGS_VIEW}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Settings
                    </Link>
                    <Link className="nav-link" to={routes.SIGN_IN}>
                        <SignOutButton />
                    </Link>
                </div>
            </div>
            <div className="navNarrow">
                <i
                    className="fa fa-bars fa-2x"
                    onClick={burgerToggle}
                    style={props.settings.mode === "night" ? mightModeToggle : daymode}
                />
                <ul className="navbar-nav">
                    <div className="brand-container">
                        <h2 className="navbar-brand modern-brand" style={props.settings.mode === "night" ? nightModeHeader : daymode}>
                            <span className="brand-icon">
                                <img src={logo} alt="Brand Logo" style={{ height: '40px', width: '40px', borderRadius: '12px', background: '#b2f7cc' }} />
                            </span>
                            <span className="brand-text">
                                <span className="brand-main">Expense</span>
                                <span className="brand-sub">Manager</span>
                            </span>
                        </h2>
                    </div>
                </ul>
                <div className="narrowLinks">
                    <Link
                        className={`nav-link ${window.location.pathname === "/home" ? "active" : "inactive"}`}
                        to={routes.HOME}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Home
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/month-view" ? "active" : "inactive"}`}
                        to={routes.MONTH_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Monthly
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/daily-view" ? "active" : "inactive"}`}
                        to={routes.DAILY_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Daily
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/filter-view" ? "active" : "inactive"}`}
                        to={routes.FILTER_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        filter
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/statistics" ? "active" : "inactive"}`}
                        to={routes.STATISTICS_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Stats
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/loan" ? "active" : "inactive"}`}
                        to={routes.LOAN_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Loan
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/savings" ? "active" : "inactive"}`}
                        to={routes.SAVINGS_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Savings
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/settings" ? "active" : "inactive"}`}
                        to={routes.SETTINGS_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightModeLink : dayModeLink}
                    >
                        Settings
                    </Link>
                    <Link className="nav-link" to={routes.SIGN_IN} onClick={burgerToggle}>
                        <SignOutButton />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavigationNonAuth = () => {
    const burgerToggle = () => {
        let linksEl = document.querySelector(".narrowLinks");
        if (linksEl.style.display === "block") {
            linksEl.style.display = "none";
        } else {
            linksEl.style.display = "block";
        }
    };

    return (
        <nav className="modern-navbar">
            <div className="navWide">
                <ul className="navbar-nav">
                    <div className="brand-container">
                        <h2 className="navbar-brand modern-brand">
                            <span className="brand-icon">
                                <img src={logo} alt="Brand Logo" style={{ height: '40px', width: '40px', borderRadius: '12px', background: '#b2f7cc' }} />
                            </span>
                            <span className="brand-text">
                                <span className="brand-main">Expense</span>
                                <span className="brand-sub">Manager</span>
                            </span>
                        </h2>
                    </div>
                </ul>
                <div className="wideDiv">
                    <Link
                        className={`nav-link ${window.location.pathname === "/" ? "active" : "inactive"}`}
                        to={routes.SIGN_IN}
                    >
                        Sign In
                    </Link>
                </div>
            </div>
            <div className="navNarrow">
                <i className="fa fa-bars fa-2x" onClick={burgerToggle} />
                <ul className="navbar-nav">
                    <div className="brand-container">
                        <h2 className="navbar-brand modern-brand">Expense Manager</h2>
                    </div>
                </ul>
                <div className="narrowLinks">
                    <Link
                        className={`nav-link ${window.location.pathname === "/" ? "active" : "inactive"}`}
                        to={routes.SIGN_IN}
                        onClick={burgerToggle}
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const Navigation = ({ authUser, settings }) => {
    // For Google Sign-In users, emailVerified might not exist, so we check if it's verified or if it's a Google user
    const isEmailVerified = authUser && authUser.emailVerified !== undefined ? authUser.emailVerified : true;
    
    // Debug information
    console.log("Navigation Debug:", { 
        authUser: !!authUser, 
        isEmailVerified, 
        settings: !!settings,
        settingsData: settings 
    });
    
    // If user is not authenticated, show non-auth navigation immediately
    if (!authUser) {
        return <NavigationNonAuth />;
    }
    
    // If user is authenticated but email not verified, show verification message
    if (!isEmailVerified) {
        return <div style={{ padding: "20px", textAlign: "center" }}>Please verify your email address.</div>;
    }
    
    // If user is authenticated and verified but settings not loaded yet
    if (!settings) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                Loading settings... 
                <br />
                <small>User ID: {authUser.uid}</small>
            </div>
        );
    }
    
    // User is authenticated, verified, and settings are loaded
    return <NavigationAuth settings={settings} />;
};

export default Navigation;
