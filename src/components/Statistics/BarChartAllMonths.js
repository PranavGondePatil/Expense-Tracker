import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import "chartjs-plugin-labels";

class BarChartAllMonths extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: new Date().getFullYear().toString()
        };
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    render() {
        const expenses = this.props.expenses;
        const currentUser = this.props.authUser;
        const selectedYear = this.state.year;
        const settings = this.props.settings;

        if (!expenses || !currentUser || !settings) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }

        if (expenses && currentUser && settings) {
            const eachExpense = utils.eachExpense(expenses);
            const allMonthsTotals = utils.totalExpensesInEachMonthOfThisYear(
                expenses,
                eachExpense,
                currentUser,
                selectedYear
            );

            const data = {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"],
                datasets: [
                    {
                        data: allMonthsTotals,
                        borderColor: "transparent",
                        backgroundColor: "rgba(102, 126, 234, 0.8)",
                        pointBackgroundColor: "rgba(0,0,0,0)",
                        pointBorderColor: "rgba(0,0,0,0)",
                        borderWidth: 4
                    }
                ]
            };

            const barArea = {
                background: "rgba(0,0,0,0)",
                position: "absolute",
                top: "15px",
                right: "15px"
            };

            // Enhanced text colors for better visibility
            const textColor = settings && settings.mode === "night" ? "#f1f5f9" : "#1e293b";
            const gridColor = settings && settings.mode === "night" ? "rgba(241, 245, 249, 0.1)" : "rgba(30, 41, 59, 0.1)";
            const legendColor = settings && settings.mode === "night" ? "#f1f5f9" : "#1e293b";

            const options = {
                legend: {
                    display: false,
                    labels: {
                        fontColor: legendColor,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontStyle: "normal"
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: gridColor,
                            zeroLineColor: gridColor
                        },
                        ticks: {
                            fontColor: textColor,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11,
                            fontStyle: "normal"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: gridColor,
                            zeroLineColor: gridColor
                        },
                        ticks: {
                            fontColor: textColor,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11,
                            fontStyle: "normal"
                        }
                    }]
                },
                plugins: {
                    labels: {
                        render: "value",
                        precision: 0,
                        showZero: true,
                        fontSize: 12,
                        fontColor: textColor,
                        fontStyle: "bold",
                        fontFamily: "'Inter', sans-serif",
                        textShadow: true,
                        shadowBlur: 10,
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        arc: true,
                        position: "inside",
                        overlap: false,
                        showActualPercentages: true,
                        outsidePadding: 4,
                        textMargin: 14
                    }
                }
            };

            const optionsMobile = {
                legend: options.legend,
                plugins: options.plugins,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: gridColor,
                            zeroLineColor: gridColor
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90,
                            fontColor: textColor,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 10,
                            fontStyle: "normal"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: gridColor,
                            zeroLineColor: gridColor
                        },
                        scaleLabel: {
                            display: false,
                            labelString: "Normalized/Indexed Data",
                        },
                        ticks: {
                            display: false
                        }
                    }]
                }
            };

            const lineArea = settings && settings.mode === "night" ? 
                { background: window.screen.width > 720 ? "#2C3034" : "#2C3034" } : 
                { background: "#f8fafc" };
            
            const headerColor = settings && settings.mode === "night" ? 
                { color: "#f1f5f9" } : 
                { color: "#1e293b" };
            
            const mobPad15 = { padding: window.screen.width > 720 ? "0" : "15px" };

            const monthDropdown = {
                display: "block",
                background: "#DDDDDD",
                float: "right",
                color: "#000",
                border: "none",
                padding: "0px 5px 0px 0px"
            };

            return (
                <div style={lineArea}>
                    <h4 style={{ ...mobPad15, ...headerColor }}>Monthly Overview</h4>
                    <div className="row">
                        <div className="col-sm-12">
                            <form>
                                <div className="col-sm-12 col-xs-12">
                                    <select
                                        name="year"
                                        style={monthDropdown}
                                        value={this.state.year}
                                        onChange={this.handleChange.bind(this)}
                                    >
                                        {utils.yearsGenereator().map((elem, i) => (
                                            <option key={i} value={elem}>{elem}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Bar
                        data={data}
                        options={window.screen.width > 720 ? options : optionsMobile}
                        height={window.screen.width > 720 ? 80 : 230}
                        responsive={true}
                    />
                </div>
            );
        }
    }
}

export default BarChartAllMonths;
