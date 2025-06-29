import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import SavingsCard from "./SavingCard";

const SavingsLayout = props => {
    const savings = props.savings;
    const settings = props.settings;
    const currentUser = props.authUser;

    if (!savings || !currentUser) {
        return <Loader />;
    }

    if (savings && currentUser) {
        // Convert savings object to array format for processing
        const savingsArray = Object.keys(savings)
            .map(function (key) {
                return { key: key, value: savings[key] };
            })
            .sort(function (a, b) {
                // Sort by date, newest first
                return new Date(b.value.date) - new Date(a.value.date);
            });

        // Filter savings for current user
        const thisUsersSavings = savingsArray.filter(elem => elem.value.uid === currentUser.uid);

        if (thisUsersSavings.length) {
            var savingsCards = thisUsersSavings.map(function (elem, i) {
                return <SavingsCard key={elem.key} savings={elem} authUser={currentUser} settings={settings} />;
            });

            return <div className="col-sm-12">{savingsCards}</div>;
        } else {
            return (
                <div className="col-sm-12 text-center" style={{ 
                    padding: "50px", 
                    color: settings.mode === "night" ? "#ffffff" : "#2c3e50",
                    fontSize: "18px"
                }}>
                    <i className="fa fa-piggy-bank fa-3x" style={{ marginBottom: "20px", opacity: 0.6 }}></i>
                    <br />
                    No savings goals found. Click the + button to create your first savings goal!
                </div>
            );
        }
    }
};

export default SavingsLayout;
