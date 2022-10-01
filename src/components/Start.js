import React from "react";
import PropTypes from "prop-types";

function Start(props) {
    return (
        <div className="start">
            <h1 className="start--title">QuickQuiz</h1>
            <h2 className="start--subtitle">A decent quiz game</h2>
            <button
                className="start--btn"
                onClick={props.handleStartClick}
            >
                Start quiz
            </button>
        </div>
    );
}

Start.propTypes = {
    handleStartClick: PropTypes.func
}

export default Start;
