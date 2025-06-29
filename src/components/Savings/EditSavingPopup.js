import React from "react";
import EditSavingForm from "./EditSavingForm";

const EditSavingPopup = props => {
    const popupOverlay = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        boxSizing: "border-box",
        overflow: "auto"
    };

    const popupContainer = {
        position: "relative",
        width: "100%",
        maxWidth: "550px",
        maxHeight: "85vh",
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#2c3e50" : "#fff") : "#fff",
        borderRadius: "12px",
        boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        animation: "slideInUp 0.3s ease-out",
        margin: "auto",
        zIndex: 1000000
    };

    const closeButton = {
        position: "absolute",
        top: "12px",
        right: "12px",
        background: "rgba(255, 255, 255, 0.25)",
        border: "none",
        color: props.settings ? (props.settings.mode === "night" ? "#ffffff" : "#2c3e50") : "#2c3e50",
        fontSize: "18px",
        fontWeight: "bold",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        zIndex: 1000001
    };

    return (
        <div style={popupOverlay} className="edit-saving-popup-overlay">
            <div style={popupContainer} className="edit-saving-popup-container">
                <div className="addExpenseHeader" style={{ 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    padding: "16px 20px",
                    borderRadius: "12px 12px 0 0",
                    fontWeight: "700",
                    textAlign: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                    position: "relative"
                }}>
                    Edit Saving
                </div>
                <div style={{ 
                    padding: "20px", 
                    flex: 1, 
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: "calc(85vh - 80px)"
                }}>
                    <EditSavingForm user={props.user} savings={props.savings} settings={props.settings} />
                </div>
                <button 
                    id="closePopup" 
                    onClick={props.closePopup}
                    style={closeButton}
                    onMouseEnter={(e) => {
                        e.target.style.background = "rgba(255, 255, 255, 0.4)";
                        e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "rgba(255, 255, 255, 0.25)";
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default EditSavingPopup;
