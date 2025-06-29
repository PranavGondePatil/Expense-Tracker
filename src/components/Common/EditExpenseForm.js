import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";
import $ from "jquery";

import Loader from "./Loader";

import * as firebase from "../../firebase/firebase";

import "react-datepicker/dist/react-datepicker.css";
import "../Home/styles/form.css";

class EditExpenseForm extends Component {
    constructor(props) {
        super(props);

        const expense = props.expense;

        this.state = {
            date: moment(expense.value.date),
            day: moment(expense.value.date).day,
            expense: expense.value.expense,
            category: expense.value.category,
            comments: expense.value.comments,
            uid: this.props.user.uid,
            dataSaved: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        firebase.db.ref(`expenseTable/${this.props.user.uid}/${this.props.expense.key}`).update({
            date: this.state.date.format("MM/DD/YYYY"),
            day: moment(this.state.date.format("MM/DD/YYYY")).day(),
            expense: Math.ceil(this.state.expense * this.props.convertedCurrency),
            category: this.state.category,
            comments: this.state.comments
        });

        $("#closePopup").click();
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handelDateChange(date) {
        this.setState({
            date: date,
            day: date.day()
        });
    }

    render() {
        if (this.props.settings) {
            const inputNightMode = {
                background: "#2c2b2b",
                color: "#a9a0a0",
                border: "1px solid #9b8c8cc7"
            };

            const inputDayMode = { background: "#fff", color: "#495057" };

            const validationBox = {
                background: "rgba(0,0,0,0)",
                color: "#ffecb8",
                fontSize: "12px",
                width: "60%",
                position: "absolute",
                bottom: "15px",
                left: "15px"
            };

            return (
                <form onSubmit={this.handleSubmit} style={{ 
                    padding: "0", 
                    margin: "0",
                    width: "100%",
                    boxSizing: "border-box"
                }}>
                    <div className="form-group row" style={{ 
                        marginBottom: "20px",
                        alignItems: "center"
                    }}>
                        <label className="col-sm-3 col-xs-6 col-form-label" style={{ 
                            fontWeight: "600", 
                            color: this.props.settings.mode === "night" ? "#ffffff" : "#2c3e50",
                            marginBottom: "8px"
                        }}>
                            <span>Date</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <DatePicker
                                className={
                                    "form-control date " +
                                    (this.props.settings.mode === "night" ? "inputNightMode" : "inputDayMode")
                                }
                                name="date"
                                selected={this.state.date}
                                onChange={this.handelDateChange.bind(this)}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1px solid #d1d5db",
                                    fontSize: "14px"
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group row" style={{ 
                        marginBottom: "20px",
                        alignItems: "center"
                    }}>
                        <label className="col-sm-3 col-xs-6 col-form-label" style={{ 
                            fontWeight: "600", 
                            color: this.props.settings.mode === "night" ? "#ffffff" : "#2c3e50",
                            marginBottom: "8px"
                        }}>
                            <span>Expense</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="number"
                                name="expense"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.expense}
                                style={{
                                    ...this.props.settings.mode === "night" ? inputNightMode : inputDayMode,
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    fontSize: "14px"
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group row" style={{ 
                        marginBottom: "20px",
                        alignItems: "center"
                    }}>
                        <label className="col-sm-3 col-xs-6 col-form-label" style={{ 
                            fontWeight: "600", 
                            color: this.props.settings.mode === "night" ? "#ffffff" : "#2c3e50",
                            marginBottom: "8px"
                        }}>
                            <span>Category</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <select
                                className="form-control"
                                name="category"
                                value={this.state.category}
                                onChange={this.handleChange.bind(this)}
                                style={{
                                    ...this.props.settings.mode === "night" ? inputNightMode : inputDayMode,
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    fontSize: "14px"
                                }}
                            >
                                <option value="Food">{this.props.settings.editedCategories["Food"] ? this.props.settings.editedCategories["Food"] : "Food"}</option>
                                <option value="Automobile">{this.props.settings.editedCategories["Automobile"] ? this.props.settings.editedCategories["Automobile"] : "Automobile"}</option>
                                <option value="Entertainment">{this.props.settings.editedCategories["Entertainment"] ? this.props.settings.editedCategories["Entertainment"] : "Entertainment"}</option>
                                <option value="Clothing">{this.props.settings.editedCategories["Clothing"] ? this.props.settings.editedCategories["Clothing"] : "Clothing"}</option>
                                <option value="Healthcare">{this.props.settings.editedCategories["Healthcare"] ? this.props.settings.editedCategories["Healthcare"] : "Healthcare"}</option>
                                <option value="Travel">{this.props.settings.editedCategories["Travel"] ? this.props.settings.editedCategories["Travel"] : "Travel"}</option>
                                <option value="Shopping">{this.props.settings.editedCategories["Shopping"] ? this.props.settings.editedCategories["Shopping"] : "Shopping"}</option>
                                <option value="Personal Care">{this.props.settings.editedCategories["Personal Care"] ? this.props.settings.editedCategories["Personal Care"] : "Personal Care"}</option>
                                <option value="Investment">{this.props.settings.editedCategories["Investment"] ? this.props.settings.editedCategories["Investment"] : "Investment"}</option>
                                <option value="Gifts & Donations">{this.props.settings.editedCategories["Gifts & Donations"] ? this.props.settings.editedCategories["Gifts & Donations"] : "Gifts & Donations"}</option>
                                <option value="Bills & Utilities">{this.props.settings.editedCategories["Bills & Utilities"] ? this.props.settings.editedCategories["Bills & Utilities"] : "Bills & Utilities"}</option>
                                <option value="Others">{this.props.settings.editedCategories["Others"] ? this.props.settings.editedCategories["Others"] : "Others"}</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row" style={{ 
                        marginBottom: "25px",
                        alignItems: "flex-start"
                    }}>
                        <label className="col-sm-3 col-xs-6 col-form-label" style={{ 
                            fontWeight: "600", 
                            color: this.props.settings.mode === "night" ? "#ffffff" : "#2c3e50",
                            marginBottom: "8px",
                            marginTop: "8px"
                        }}>
                            <span>Comments</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <textarea
                                className="form-control"
                                type="text"
                                required
                                name="comments"
                                rows="4"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.comments}
                                style={{
                                    ...this.props.settings.mode === "night" ? inputNightMode : inputDayMode,
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    minHeight: "100px",
                                    resize: "vertical"
                                }}
                            />
                        </div>
                    </div>

                    {this.state.dataSaved ? (
                        <div className="alert alert-success" style={{ 
                            marginBottom: "20px", 
                            padding: "12px 16px", 
                            borderRadius: "8px",
                            backgroundColor: "#d4edda",
                            border: "1px solid #c3e6cb",
                            color: "#155724"
                        }}>
                            You did not update anything
                        </div>
                    ) : null}
                    
                    {this.state.expense > 0 && this.state.date && this.state.category ? (
                        <div style={{ textAlign: "right", marginTop: "20px" }}>
                            <button className="btn btn-primary" type="submit" style={{ 
                                padding: "12px 24px",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                border: "none",
                                color: "#ffffff",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}>
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div style={{
                                marginBottom: "20px",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                background: "rgba(255, 193, 7, 0.1)",
                                border: "1px solid rgba(255, 193, 7, 0.3)",
                                color: "#856404"
                            }}>
                                <div style={{ fontWeight: "600", marginBottom: "4px" }}>Please fix the following:</div>
                                <div>• Expense: should be greater than 0</div>
                                <div>• Date: should be selected</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <button className="btn btn-primary" disabled type="submit" style={{ 
                                    padding: "12px 24px",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    background: "#6c757d",
                                    border: "none",
                                    color: "#ffffff",
                                    cursor: "not-allowed",
                                    opacity: "0.6"
                                }}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            );
        } else {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    }
}

export default EditExpenseForm;
