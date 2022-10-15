import React from "react";
import PropTypes from "prop-types";

function Controls(props) {
    if (props.hasEnded) {
        return (
            <div className="controls-end">
                <div>
                    <h2 className="controls-end--score">
                        Total score: {props.score.totalCorrect} / {props.score.totalAnswered}
                    </h2>
                    <button
                        className="controls-end--reset-btn"
                        onClick={props.handleResetClick}>
                        Reset score
                    </button>
                </div>
                <div>
                    <h2 className="controls-end--score">
                        You had {props.score.currCorrect} / {props.quiz.length} correct!
                    </h2>
                    <button
                        className="controls-end--replay-btn"
                        onClick={props.handleReplayClick}>
                        Play next
                    </button>
                </div>
            </div>
        );
    } else if (props.quiz.length > 0) {
        return (
            <button
                className="controls--check-btn"
                onClick={props.handleCheckAnsClick}>
                Check answers
            </button>
        );
    } else {
        return (
            <></>
        );
    }
}

Controls.propTypes = {
    hasEnded: PropTypes.bool,
    score: PropTypes.objectOf(PropTypes.number),
    quiz: PropTypes.array,
    handleReplayClick: PropTypes.func,
    handleResetClick: PropTypes.func,
    handleCheckAnsClick: PropTypes.func
};

export default Controls;
