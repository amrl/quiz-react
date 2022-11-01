import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <h1 className="home--title">QuickQuiz</h1>
            <h2 className="home--subtitle">A decent quiz game</h2>
            <Link to="/quiz-react/play">
                <button className="home--start-btn">
                    Start quiz
                </button>
            </Link>
        </div>
    );
}

export default Home;
