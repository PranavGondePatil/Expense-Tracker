import React, { Component } from "react";
import Loader from "./../Common/Loader";
import url from "./man.png";

import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

import * as db from "../../firebase/db";
import * as analytics from "./../../analytics/analytics";
import { storage } from "../../firebase/firebase";

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        const defaultCategories = {
            "Food": "",
            "Automobile": "",
            "Entertainment": "",
            "Clothing": "",
            "Healthcare": "",
            "Travel": "",
            "Shopping":"",
            "Personal Care": "",
            "Investment": "",
            "Gifts & Donations": "",
            "Bills & Utilities": "",
            "Others": ""
        }

        this.state = {
            font: this.props.settings ? this.props.settings.font : "sans-serif",
            dataSaved: false,
            currency: this.props.settings
                ? this.props.settings.currency
                    ? this.props.settings.currency
                    : "Indian Rupees"
                : "Indian Rupees",
            monthLimit: this.props.settings
                ? this.props.settings.monthLimit
                    ? this.props.settings.monthLimit
                    : 15000
                : 15000,
            mode: this.props.settings ? this.props.settings.mode : "day",
            travelMode: this.props.settings
                ? this.props.settings.travelMode
                    ? this.props.settings.travelMode
                    : "off"
                : "off",
            fromCurrency: this.props.settings
                ? this.props.settings.fromCurrency
                    ? this.props.settings.fromCurrency
                    : "Indian Rupees"
                : "Indian Rupees",
            editedCategories: this.props.settings 
                ? this.props.settings.editedCategories 
                    ? {
                    "Food": this.props.settings.editedCategories["Food"] ? this.props.settings.editedCategories["Food"] : "",
                    "Automobile": this.props.settings.editedCategories["Automobile"] ? this.props.settings.editedCategories["Automobile"] : "",
                    "Entertainment": this.props.settings.editedCategories["Entertainment"] ? this.props.settings.editedCategories["Entertainment"] : "",
                    "Clothing": this.props.settings.editedCategories["Clothing"] ? this.props.settings.editedCategories["Clothing"] : "",
                    "Healthcare": this.props.settings.editedCategories["Healthcare"] ? this.props.settings.editedCategories["Healthcare"] : "",
                    "Travel": this.props.settings.editedCategories["Travel"] ? this.props.settings.editedCategories["Travel"] : "",
                    "Shopping":this.props.settings.editedCategories["Shopping"] ? this.props.settings.editedCategories["Shopping"] : "",
                    "Personal Care": this.props.settings.editedCategories["Personal Care"] ? this.props.settings.editedCategories["Personal Care"] : "",
                    "Investment": this.props.settings.editedCategories["Investment"] ? this.props.settings.editedCategories["Investment"] : "",
                    "Gifts & Donations": this.props.settings.editedCategories["Gifts & Donations"] ? this.props.settings.editedCategories["Gifts & Donations"] : "",
                    "Bills & Utilities": this.props.settings.editedCategories["Bills & Utilities"] ? this.props.settings.editedCategories["Bills & Utilities"] : "",
                    "Others": this.props.settings.editedCategories["Others"] ? this.props.settings.editedCategories["Others"] : ""
                }   : defaultCategories 
                : defaultCategories,
            profileImage: null,
            profileImageUrl: this.props.user ? this.props.user.photoURL : null,
            uploadingImage: false,
            imageUploadProgress: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEditedCategories = this.handleChangeEditedCategories.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        db.doCreateSettingsForUser(
            this.props.user.uid,
            this.state.font,
            this.state.mode,
            this.state.currency,
            this.state.travelMode,
            this.state.fromCurrency,
            this.state.monthLimit,
            this.state.editedCategories
        );

        this.setState({ dataSaved: true });
        setTimeout(() => this.setState({ dataSaved: false }), 3000);
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleChangeEditedCategories(e) {
        let newEditedCategories = {};
        newEditedCategories[e.target.name] = e.target.value;
        this.setState({
            editedCategories: {
                ...this.state.editedCategories,
                ...newEditedCategories
            }
        })
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            this.setState({
                profileImage: file
            });
        }
    }

    handleImageUpload() {
        if (!this.state.profileImage) {
            alert('Please select an image first');
            return;
        }

        this.setState({ uploadingImage: true, imageUploadProgress: 0 });

        const file = this.state.profileImage;
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`profile-images/${this.props.user.uid}/${file.name}`);

        const uploadTask = imageRef.put(file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({ imageUploadProgress: progress });
            },
            (error) => {
                console.error('Upload error:', error);
                alert('Failed to upload image. Please try again.');
                this.setState({ uploadingImage: false, imageUploadProgress: 0 });
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.setState({
                        profileImageUrl: downloadURL,
                        uploadingImage: false,
                        imageUploadProgress: 0,
                        profileImage: null
                    });

                    this.props.user.updateProfile({
                        photoURL: downloadURL
                    }).then(() => {
                        console.log('Profile photo updated successfully');
                    }).catch((error) => {
                        console.error('Error updating profile photo:', error);
                    });

                    db.saveUserProfileImage(this.props.user.uid, downloadURL);
                });
            }
        );
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    render() {
        if (this.props.settings && this.props.user && this.props.cards) {
            const isNightMode = this.props.settings.mode === "night";
            
            const pageStyle = {
                fontFamily: this.props.settings.font || "sans-serif",
                backgroundColor: isNightMode ? "#1a1a2e" : "#f8fafc",
                minHeight: "91vh",
                padding: "20px",
                color: isNightMode ? "#ffffff" : "#2c3e50"
            };

            const cardStyle = {
                background: isNightMode 
                    ? "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)" 
                    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                borderRadius: "20px",
                boxShadow: isNightMode 
                    ? "0 10px 30px rgba(0, 0, 0, 0.5)" 
                    : "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: isNightMode ? "1px solid #34495e" : "1px solid #e2e8f0",
                padding: "30px",
                marginBottom: "20px"
            };

            const profileImageStyle = {
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #667eea",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                margin: "0 auto 20px auto",
                display: "block"
            };

            const sectionHeaderStyle = {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#ffffff",
                padding: "15px 25px",
                borderRadius: "12px",
                marginBottom: "25px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "1.2rem",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
            };

            const inputStyle = {
                background: isNightMode ? "#34495e" : "#ffffff",
                color: isNightMode ? "#ffffff" : "#2c3e50",
                border: isNightMode ? "1px solid #4a5568" : "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px 15px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                width: "100%"
            };

            const labelStyle = {
                color: isNightMode ? "#e2e8f0" : "#4a5568",
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
                display: "block"
            };

            const buttonStyle = {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#ffffff",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                textDecoration: "none",
                display: "inline-block"
            };

            const uploadButtonStyle = {
                ...buttonStyle,
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                margin: "5px"
            };

            const progressBarStyle = {
                width: "100%",
                height: "6px",
                background: isNightMode ? "#4a5568" : "#e2e8f0",
                borderRadius: "3px",
                margin: "10px 0",
                overflow: "hidden"
            };

            const progressFillStyle = {
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "3px",
                transition: "width 0.3s ease"
            };

            const switchContainerStyle = {
                display: "flex",
                alignItems: "center",
                gap: "15px"
            };

            const switchStyle = {
                position: "relative",
                display: "inline-block",
                width: "50px",
                height: "24px"
            };

            const switchInputStyle = {
                opacity: 0,
                width: 0,
                height: 0
            };

            const switchSliderStyle = {
                position: "absolute",
                cursor: "pointer",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isNightMode ? "#4a5568" : "#cbd5e1",
                transition: "0.3s",
                borderRadius: "24px"
            };

            const switchSliderBeforeStyle = {
                position: "absolute",
                content: '""',
                height: "18px",
                width: "18px",
                left: "3px",
                bottom: "3px",
                background: "#ffffff",
                transition: "0.3s",
                borderRadius: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
            };

            return (
                <div className="settings-page" style={pageStyle}>
                    <div className="container-fluid">
                    <div className="row">
                            {/* Profile Section */}
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div style={cardStyle}>
                                    <div style={sectionHeaderStyle}>
                                        <i className="fa fa-user-circle fa-lg" style={{ marginRight: "10px" }}></i>
                                        Profile Settings
                                    </div>
                                    
                                    <div style={{ textAlign: "center" }}>
                                        <img 
                                            src={this.state.profileImageUrl || this.props.user.photoURL || url} 
                                            style={profileImageStyle} 
                                            alt="Profile" 
                                        />
                                        
                                        {this.state.uploadingImage && (
                                            <div style={progressBarStyle}>
                                                <div 
                                                    style={{
                                                        ...progressFillStyle,
                                                        width: `${this.state.imageUploadProgress}%`
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                        
                                        <div style={{ marginBottom: "20px" }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={this.handleFileSelect}
                                                style={{ display: "none" }}
                                                id="profile-image-input"
                                            />
                                            <label htmlFor="profile-image-input" style={buttonStyle}>
                                                <i className="fa fa-camera" style={{ marginRight: "8px" }}></i>
                                                Choose Image
                                            </label>
                                            
                                            {this.state.profileImage && (
                                                <button 
                                                    onClick={this.handleImageUpload}
                                                    disabled={this.state.uploadingImage}
                                                    style={{
                                                        ...uploadButtonStyle,
                                                        background: this.state.uploadingImage 
                                                            ? "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)"
                                                            : "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                                    }}
                                                >
                                                    <i className="fa fa-upload" style={{ marginRight: "8px" }}></i>
                                                    {this.state.uploadingImage ? 'Uploading...' : 'Upload'}
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div style={{ textAlign: "left" }}>
                                            <h5 style={{ 
                                                color: "#ffffff", 
                                                fontWeight: "700",
                                                marginBottom: "15px",
                                                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
                                            }}>
                                                <i className="fa fa-user" style={{ marginRight: "10px", color: "#667eea" }}></i>
                                                {this.props.user.displayName || this.props.user.email}
                                            </h5>
                                            
                                            <p style={{ 
                                                color: "#ffffff", 
                                                marginBottom: "10px",
                                                fontSize: "14px",
                                                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)"
                                            }}>
                                                <i className="fa fa-envelope" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                {this.props.user.email}
                                            </p>
                                            
                                            <p style={{ 
                                                color: "#ffffff", 
                                                marginBottom: "15px",
                                                fontSize: "14px",
                                                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)"
                                            }}>
                                                <i className="fa fa-shield" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                {this.props.user.emailVerified ? "Verified Account" : "Unverified Account"}
                                            </p>
                                            
                                            <Link to={routes.UPDATE_PASSWORD} style={buttonStyle}>
                                                <i className="fa fa-key" style={{ marginRight: "8px" }}></i>
                                                Update Password
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Section */}
                            <div className="col-lg-8 col-md-6">
                                <div style={cardStyle}>
                                    <div style={sectionHeaderStyle}>
                                        <i className="fa fa-cog fa-lg" style={{ marginRight: "10px" }}></i>
                                        App Settings
                        </div>
                                    
                            <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label style={labelStyle}>
                                                    <i className="fa fa-font" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                    Font Family
                                    </label>
                                        <select
                                            name="font"
                                            value={this.state.font}
                                                    onChange={this.handleChange}
                                                    style={inputStyle}
                                        >
                                            <option value="Dhurjati">Dhurjati</option>
                                                    <option value="sans-serif">Sans Serif</option>
                                            <option value="Roboto">Roboto</option>
                                            <option value="Ubuntu">Ubuntu</option>
                                            <option value="Exo 2">Exo 2</option>
                                            <option value="Lobster">Lobster</option>
                                        </select>
                                    </div>
                                            
                                            <div className="col-md-6 mb-3">
                                                <label style={labelStyle}>
                                                    <i className="fa fa-money" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                    Currency
                                    </label>
                                                <select
                                                    name="currency"
                                                    value={this.state.currency}
                                                    onChange={this.handleChange}
                                                    style={inputStyle}
                                                >
                                                    <option value="Indian Rupees">Indian Rupees</option>
                                                    <option value="US Dollars">US Dollars</option>
                                                    <option value="Pounds">Pounds</option>
                                                    <option value="Yen">Yen</option>
                                                    <option value="Euro">Euro</option>
                                                </select>
                                            </div>
                                            
                                            <div className="col-md-6 mb-3">
                                                <label style={labelStyle}>
                                                    <i className="fa fa-calendar" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                    Monthly Limit
                                                </label>
                                                <input
                                                    type="number"
                                                    name="monthLimit"
                                                    value={this.state.monthLimit}
                                                    onChange={this.handleChange}
                                                    style={inputStyle}
                                                    placeholder="Enter monthly limit"
                                                />
                                </div>

                                            <div className="col-md-6 mb-3">
                                                <label style={labelStyle}>
                                                    <i className="fa fa-moon-o" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                    Theme Mode
                                        </label>
                                                <div style={switchContainerStyle}>
                                                    <span style={{ color: isNightMode ? "#e2e8f0" : "#4a5568" }}>Day</span>
                                                    <label style={switchStyle}>
                                            <input
                                                            type="checkbox"
                                                            name="mode"
                                                            checked={this.state.mode === "night"}
                                                            onChange={(e) => this.setState({ mode: e.target.checked ? "night" : "day" })}
                                                            style={switchInputStyle}
                                                        />
                                                        <span style={{
                                                            ...switchSliderStyle,
                                                            background: this.state.mode === "night" ? "#667eea" : (isNightMode ? "#4a5568" : "#cbd5e1")
                                                        }}>
                                                            <span style={{
                                                                ...switchSliderBeforeStyle,
                                                                transform: this.state.mode === "night" ? "translateX(26px)" : "translateX(0)"
                                                            }}></span>
                                                        </span>
                                        </label>
                                                    <span style={{ color: isNightMode ? "#e2e8f0" : "#4a5568" }}>Night</span>
                                        </div>
                                    </div>
                                        
                                            <div className="col-md-6 mb-3">
                                                <label style={labelStyle}>
                                                    <i className="fa fa-plane" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                    Travel Mode
                                        </label>
                                                <div style={switchContainerStyle}>
                                                    <span style={{ color: isNightMode ? "#e2e8f0" : "#4a5568" }}>Off</span>
                                                    <label style={switchStyle}>
                                            <input
                                                            type="checkbox"
                                                            name="travelMode"
                                                            checked={this.state.travelMode === "on"}
                                                            onChange={(e) => this.setState({ travelMode: e.target.checked ? "on" : "off" })}
                                                            style={switchInputStyle}
                                                        />
                                                        <span style={{
                                                            ...switchSliderStyle,
                                                            background: this.state.travelMode === "on" ? "#667eea" : (isNightMode ? "#4a5568" : "#cbd5e1")
                                                        }}>
                                                            <span style={{
                                                                ...switchSliderBeforeStyle,
                                                                transform: this.state.travelMode === "on" ? "translateX(26px)" : "translateX(0)"
                                                            }}></span>
                                                        </span>
                                        </label>
                                                    <span style={{ color: isNightMode ? "#e2e8f0" : "#4a5568" }}>On</span>
                                        </div>
                                    </div>    

                                            {this.state.travelMode === "on" && (
                                                <div className="col-md-6 mb-3">
                                                    <label style={labelStyle}>
                                                        <i className="fa fa-exchange" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                        From Currency
                                        </label>
                                                    <select
                                                        name="fromCurrency"
                                                        value={this.state.fromCurrency}
                                                        onChange={this.handleChange}
                                                        style={inputStyle}
                                                    >
                                                        <option value="Indian Rupees">Indian Rupees</option>
                                                        <option value="US Dollars">US Dollars</option>
                                                        <option value="Pounds">Pounds</option>
                                                        <option value="Yen">Yen</option>
                                                        <option value="Euro">Euro</option>
                                                    </select>
                                        </div>
                                            )}
                                    </div>   

                                        {/* Category Names Section */}
                                        <div style={{ marginTop: "30px" }}>
                                            <div style={sectionHeaderStyle}>
                                                <i className="fa fa-tags fa-lg" style={{ marginRight: "10px" }}></i>
                                                Customize Category Names
                                    </div>    

                                            <div className="row">
                                                {Object.keys(this.state.editedCategories).map((category, index) => (
                                                    <div key={category} className="col-md-6 mb-3">
                                                        <label style={labelStyle}>
                                                            <i className="fa fa-tag" style={{ marginRight: "8px", color: "#667eea" }}></i>
                                                            {category}
                                        </label>
                                            <input
                                                type="text"
                                                            name={category}
                                                            value={this.state.editedCategories[category]}
                                                            onChange={this.handleChangeEditedCategories}
                                                            style={inputStyle}
                                                            placeholder={`Custom name for ${category}`}
                                            />
                                        </div>
                                                ))}
                                        </div>
                                    </div>

                                        {/* Success Message */}
                                        {this.state.dataSaved && (
                                            <div style={{
                                                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                                color: "#ffffff",
                                                padding: "15px",
                                                borderRadius: "8px",
                                                marginBottom: "20px",
                                                textAlign: "center",
                                                fontWeight: "600"
                                            }}>
                                                <i className="fa fa-check-circle" style={{ marginRight: "8px" }}></i>
                                                Settings saved successfully!
                                            </div>
                                        )}

                                        {/* Save Button */}
                                        <div style={{ textAlign: "center", marginTop: "30px" }}>
                                            <button type="submit" style={{
                                                ...buttonStyle,
                                                padding: "15px 40px",
                                                fontSize: "16px"
                                            }}>
                                                <i className="fa fa-save" style={{ marginRight: "8px" }}></i>
                                                Save Settings
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loader />;
        }
    }
}

export default SettingsPage;
