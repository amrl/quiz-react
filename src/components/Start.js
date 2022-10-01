import React from "react"

function Start({handleStartClick}) {
    return (
        <div className="start">
            <h1 className="start--title">QuickQuiz</h1>
            <h2 className="start--subtitle">A decent quiz game</h2>
            <button
                className="start--btn"
                onClick={handleStartClick}
            >
                Start quiz
            </button>
        </div>
    );
}

export default Start;
