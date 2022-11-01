import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="start">
            <h1 className="start--title">QuickQuiz</h1>
            <h2 className="start--subtitle">A decent quiz game</h2>
            <Link to="/quiz-react/play">
                <button className="start--btn">
                    Start quiz
                </button>
            </Link>
        </div>
    );
}

export default Home;
