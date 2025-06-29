import React, { Component } from "react";
import { BrowserRouter as Router, Switch , Route, Redirect } from "react-router-dom";
import { firebase } from "../firebase/index";
import { defaults } from "react-chartjs-2";
import Trianglify from "trianglify";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/index.css";
import "../assets/css/signin.css";
import "../assets/css/modern-components.css";
import "../assets/css/text-visibility-fixes.css";

import Navigation from "./Navigation/index";
//import LandingPage from "./Landing/index";
import SignUpPage from "./signUp/index";
import SignInPage from "./signIn/index";
import ShopPage from "./Shop/index";
import PasswordForgetPage from "./forgotPassword/index";
import HomePage from "./Home/index";
import UpdatePassword from "./Settings/UpdatePassword";
import MonthViewPage from "./MonthView/index";
import DailyViewPage from "./DailyView/index";
import FilterViewPage from "./FilterView/index";
import UserVerification from "./UserVerification/index";
import StatisticsPage from "./Statistics/index";
import LoanPage from "./Loan/index";
import SettingsPage from "./Settings/index";
import SavingsPage from "./Savings/index";
import ErrorPage from "./Error/index";

import * as routes from "../constants/routes";
import * as db from "../firebase/db";
import * as utils from "./Util";
import * as analytics from "./../analytics/analytics";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            users: null,
            expenses: null,
            loans: null,
            defaultCategoriesNames: null,
            defaultCategoriesColors: null,
            settings: null,
            savings: null
        };
    }

    componentDidMount() {
        document.title = "Expense Manager";

        analytics.initGA();
        analytics.logPageView();

        firebase.auth.onAuthStateChanged(authUser => {
            console.log("Auth State Changed:", {
                authUser: !!authUser,
                authUserID: authUser ? authUser.uid : null,
                authUserEmail: authUser ? authUser.email : null
            });
            
            authUser
                ? this.setState({
                    authUser: authUser
                }, () => {
                    // All Firebase listeners must be set only if authUser and authUser.uid exist
                    if (this.state.authUser && this.state.authUser.uid) {
                        // get all the settings
                        firebase.db.ref(`settings/${this.state.authUser.uid}`).on("value", data => {
                            if (!this.state.authUser || !this.state.authUser.uid) return;
                            console.log("Settings Debug:", {
                                userID: this.state.authUser.uid,
                                dataExists: !!data.val(),
                                dataValue: data.val()
                            });

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

                            if (data.val() !== null) {
                                console.log("Setting existing settings:", data.val());
                                this.setState({
                                    settings: data.val()
                                });

                                if(!data.val().editedCategories) {
                                    db.doCreateSettingsForUser(
                                        this.state.authUser.uid,
                                        data.val().font,
                                        data.val().mode,
                                        data.val().currency,
                                        data.val().travelMode,
                                        data.val().fromCurrency,
                                        data.val().monthLimit,
                                        defaultCategories
                                    );
                                }

                                if (this.state.settings) {
                                    //setting the font family to chart.js
                                    defaults.global.defaultFontFamily = this.state.settings.font || "sans-serif";
                                }
                            } else {
                                console.log("Creating default settings for new user");
                                // Create default settings for new user and immediately set them in state
                                const defaultSettings = {
                                    font: "sans-serif",
                                    mode: "night",
                                    currency: "Indian Rupees",
                                    travelMode: "off",
                                    fromCurrency: "Indian Rupees",
                                    monthLimit: 15000,
                                    editedCategories: defaultCategories
                                };
                                
                                console.log("Setting default settings in state:", defaultSettings);
                                // Set the settings immediately in state so the app doesn't get stuck loading
                                this.setState({
                                    settings: defaultSettings
                                });
                                
                                // Then create them in Firebase
                                db.doCreateSettingsForUser(
                                    this.state.authUser.uid,
                                    defaultSettings.font,
                                    defaultSettings.mode,
                                    defaultSettings.currency,
                                    defaultSettings.travelMode,
                                    defaultSettings.fromCurrency,
                                    defaultSettings.monthLimit,
                                    defaultSettings.editedCategories
                                );
                            }
                        }, (error) => {
                            console.error("Settings loading error:", error);
                            // If there's an error loading settings, create default settings anyway
                            const defaultSettings = {
                                font: "sans-serif",
                                mode: "night",
                                currency: "Indian Rupees",
                                travelMode: "off",
                                fromCurrency: "Indian Rupees",
                                monthLimit: 15000,
                                editedCategories: {
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
                            };
                            
                            console.log("Setting default settings due to error:", defaultSettings);
                            this.setState({
                                settings: defaultSettings
                            });
                        });

                        // get all the expenses from new table
                        firebase.db.ref(`expenseTable/${this.state.authUser.uid}`).on("value", data => {
                            if (!this.state.authUser || !this.state.authUser.uid) return;
                            console.log("Expenses Debug:", {
                                userID: this.state.authUser.uid,
                                dataExists: !!data.val(),
                                dataValue: data.val(),
                                dataSnapshot: data
                            });
                            
                            if (data.val() !== null) {
                                console.log("Setting expenses in state:", data.val());
                                this.setState({
                                    expenses: data.val()
                                });
                            } else {
                                console.log("No expenses found, checking legacy table");
                                // get and set expenses in db from old expenses table to new expenseTable
                                firebase.db.ref("expenses").on("value", data => {
                                    if (data.val() !== null) {
                                        const eachExpense = utils.eachExpense(data.val());
                                        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, this.state.authUser);

                                        thisUsersExpenses.map(elem => {
                                            db.doCreateExpenseTable(
                                                elem.value.uid,
                                                elem.value.date,
                                                elem.value.expense,
                                                elem.value.category,
                                                elem.value.comments,
                                                elem.value.day,
                                                elem.key
                                            );
                                        });
                                        thisUsersExpenses.map(elem => {
                                            firebase.db.ref(`expenses/${elem.key}`).remove();
                                        });

                                        // need to set empty state once deleting all records in legacy table
                                        // or else it will always be loading

                                        this.setState({
                                            expenses: data.val()
                                        });
                                    } else {
                                        console.log("No expenses in legacy table either");
                                        this.setState({
                                            expenses: {}
                                        });
                                    }
                                });
                            }
                        }, (error) => {
                            console.error("Expenses loading error:", error);
                            this.setState({
                                expenses: {}
                            });
                        });

                        // get all the savings from new table
                        firebase.db.ref(`savingsTable/${this.state.authUser.uid}`).on("value", data => {
                            if (!this.state.authUser || !this.state.authUser.uid) return;
                            console.log("Savings Debug:", {
                                userID: this.state.authUser.uid,
                                dataExists: !!data.val(),
                                dataValue: data.val()
                            });
                            
                            if (data.val() !== null) {
                                console.log("Setting savings in state:", data.val());
                                this.setState({ savings: data.val() });
                            } else {
                                console.log("No savings found, setting empty object");
                                this.setState({ savings: {} });
                            }
                        }, (error) => {
                            console.error("Savings loading error:", error);
                            this.setState({ savings: {} });
                        });

                        // get all the defaultCategories
                        firebase.db.ref("defaultCategories").on("value", data => {
                            if (data.val() !== null) {
                                this.setState({
                                    defaultCategoriesNames: Object.keys(data.val()),
                                    defaultCategoriesColors: Object.values(data.val())
                                });
                            }
                        });

                        // // get all the loan details
                        // firebase.db.ref("loans").on("value", data => {
                        //     if (data) {
                        //         this.setState({
                        //             loans: data.val()
                        //         });
                        //     }
                        // });

                        // get all the loans from new table
                        firebase.db.ref(`loanTable/${this.state.authUser.uid}`).on("value", data => {
                            if (!this.state.authUser || !this.state.authUser.uid) return;
                            console.log("Loans Debug:", {
                                userID: this.state.authUser.uid,
                                dataExists: !!data.val(),
                                dataValue: data.val()
                            });
                            
                            if (data.val() !== null) {
                                console.log("Setting loans in state:", data.val());
                                this.setState({
                                    loans: data.val()
                                });
                            } else {
                                console.log("No loans found, checking legacy table");
                                // get and set loans in db from old loans table to new loanTable
                                firebase.db.ref("loans").on("value", data => {
                                    if (data.val() !== null) {
                                        const eachExpense = utils.eachExpense(data.val());
                                        const thisUsersLoans = utils.currentUsersExpenses(eachExpense, this.state.authUser);

                                        thisUsersLoans.map(elem => {
                                            db.doCreateLoanTable(
                                                elem.value.uid,
                                                elem.value.date,
                                                elem.value.amount,
                                                elem.value.loanType,
                                                elem.value.reason,
                                                elem.value.person,
                                                elem.value.day,
                                                elem.value.status,
                                                elem.key
                                            );
                                        });

                                        thisUsersLoans.map(elem => {
                                            firebase.db.ref(`loans/${elem.key}`).remove();
                                        });

                                        // need to set empty state once deleting all records in legacy table
                                        // or else it will always be loading

                                        this.setState({
                                            loans: data.val()
                                        });
                                    } else {
                                        console.log("No loans in legacy table either");
                                        this.setState({
                                            loans: {}
                                        });
                                    }
                                });
                            }
                        }, (error) => {
                            console.error("Loans loading error:", error);
                            this.setState({
                                loans: {}
                            });
                        });

                        const expensesRef = firebase.db.ref(`expenseTable/${this.state.authUser.uid}`);
                        expensesRef.on("child_removed", data => {
                            if (!this.state.authUser || !this.state.authUser.uid) return;
                            firebase.db.ref(`expenseTable/${this.state.authUser.uid}`).on("value", data => {
                                if (data) {
                                    this.setState({
                                        expenses: data.val()
                                    });
                                }
                            });
                        });

                        const loansRef = firebase.db.ref(`loanTable/${this.state.authUser.uid}`);
                        loansRef.on("child_removed", data => {
                            if (!this.state.authUser || !this.state.authUser.uid) return;
                            firebase.db.ref(`loanTable/${this.state.authUser.uid}`).on("value", data => {
                                if (data) {
                                    this.setState({
                                        loans: data.val()
                                    });
                                }
                            });
                        });
                    }
                })
                : this.setState({
                    authUser: null
                });
        });
    }

    render() {
        const bodyStyle = {
            backgroundColor: this.state.settings
                ? this.state.settings.mode === "night"
                    ? "#484842 !important"
                    : "auto"
                : "auto",
            height: "100vh"
        };

        // Generate cards with error handling
        let cards = {};
        try {
            var patternconfig = { height: 300, width: 500, cell_size: 35 };
            var pattern = Trianglify({ ...patternconfig });
            var pattern2 = Trianglify({ ...patternconfig });
            var pattern3 = Trianglify({ ...patternconfig });
            var pattern4 = Trianglify({ ...patternconfig });
            var pattern5 = Trianglify({ ...patternconfig });
            var pattern6 = Trianglify({ ...patternconfig });
            var pattern7 = Trianglify({ ...patternconfig });
            var pattern8 = Trianglify({ ...patternconfig });

            cards = {
                card8: { backgroundImage: `url(${pattern8.png()})` },
                card7: { backgroundImage: `url(${pattern7.png()})` },
                card6: { backgroundImage: `url(${pattern6.png()})` },
                card5: { backgroundImage: `url(${pattern5.png()})` },
                card4: { backgroundImage: `url(${pattern4.png()})` },
                card3: { backgroundImage: `url(${pattern3.png()})` },
                card2: { backgroundImage: `url(${pattern2.png()})` },
                card1: { backgroundImage: `url(${pattern.png()})` }
            };
        } catch (error) {
            console.error("Error generating cards:", error);
            // Fallback cards with solid colors
            cards = {
                card8: { backgroundColor: "#ff6b6b" },
                card7: { backgroundColor: "#4ecdc4" },
                card6: { backgroundColor: "#45b7d1" },
                card5: { backgroundColor: "#96ceb4" },
                card4: { backgroundColor: "#feca57" },
                card3: { backgroundColor: "#ff9ff3" },
                card2: { backgroundColor: "#54a0ff" },
                card1: { backgroundColor: "#5f27cd" }
            };
        }

        return (
            <Router>
                <div style={bodyStyle}>
                    <Navigation authUser={this.state.authUser} settings={this.state.settings} />
                    <Switch>
                    {/* Default route - redirect authenticated users to home, show sign-in for others */}
                    <Route exact path="/" component={() => 
                        this.state.authUser ? <Redirect to={routes.HOME} /> : <SignInPage />
                    } />
                    
                    <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                    <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                    <Route exact path={routes.SHOP} component={() => <ShopPage />} />

                    <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
                    <Route
                        exact
                        path={routes.UPDATE_PASSWORD}
                        component={() => 
                            this.state.authUser ? <UpdatePassword user={this.state.authUser} /> : <Redirect to={routes.SIGN_IN} />
                        }
                    />
                    <Route exact path={routes.USER_VERIFICATION} component={() => <UserVerification />} />
                    <Route
                        exact
                        path={routes.HOME}
                        component={() => 
                            this.state.authUser ? (
                                <HomePage
                                    user={this.state.authUser}
                                    expenses={this.state.expenses}
                                    settings={this.state.settings}
                                    cards={cards}
                                />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />
                    <Route
                        exact
                        path={routes.MONTH_VIEW}
                        component={() => 
                            this.state.authUser ? (
                                <MonthViewPage
                                    user={this.state.authUser}
                                    expenses={this.state.expenses}
                                    settings={this.state.settings}
                                    cards={cards}
                                />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />

                    <Route
                        exact
                        path={routes.DAILY_VIEW}
                        component={() => 
                            this.state.authUser ? (
                                <DailyViewPage
                                    user={this.state.authUser}
                                    expenses={this.state.expenses}
                                    settings={this.state.settings}
                                    cards={cards}
                                />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />

                    <Route
                        exact
                        path={routes.FILTER_VIEW}
                        component={() => 
                            this.state.authUser ? (
                                <FilterViewPage
                                    user={this.state.authUser}
                                    expenses={this.state.expenses}
                                    settings={this.state.settings}
                                    cards={cards}
                                />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />
                    <Route
                        exact
                        path={routes.STATISTICS_VIEW}
                        component={() => 
                            this.state.authUser ? (
                                <StatisticsPage
                                    user={this.state.authUser}
                                    expenses={this.state.expenses}
                                    settings={this.state.settings}
                                    cards={cards}
                                />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />
                    <Route
                        exact
                        path={routes.LOAN_VIEW}
                        component={() => 
                            this.state.authUser ? (
                                <LoanPage
                                    user={this.state.authUser}
                                    loans={this.state.loans}
                                    settings={this.state.settings}
                                    cards={cards}
                                />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />

                    <Route
                        exact
                        path={routes.SETTINGS_VIEW}
                        component={() => 
                            this.state.authUser ? (
                                <SettingsPage user={this.state.authUser} settings={this.state.settings} cards={cards} />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />

                    <Route
                        exact
                        path={routes.SAVINGS_VIEW}
                        component={() => 
                            this.state.authUser ? (
                                <SavingsPage
                                    user={this.state.authUser}
                                    savings={this.state.savings}
                                    settings={this.state.settings}
                                />
                            ) : <Redirect to={routes.SIGN_IN} />
                        }
                    />

                    <Route
                        component={() => (
                            <ErrorPage />
                        )}
                    />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
