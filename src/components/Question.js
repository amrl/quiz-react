import React from "react";
import {decode} from "html-entities";
import PropTypes from "prop-types";

function Question(props) {    
    function getOptionBtnClass(optionIdx) {
        const {selectedOptionIdx, correctOptionIdx, hasEnded} = props;

        if (hasEnded) {
            if (optionIdx === correctOptionIdx) {
                return "correct-option";
            } else if (optionIdx === selectedOptionIdx) {
                return "wrong-selected-option";
            } else {
                return "remaining-option";
            }
        }
        
        if (optionIdx === selectedOptionIdx) {
            return "selected-option";
        }

        return "";
    }

    const optionBtns = props.options.map((option, optionIdx) => (
        <button
            key={optionIdx}
            className={`question--option-btn ${getOptionBtnClass(optionIdx)}`}
            onClick={() => props.selectOption(optionIdx)}>
            {decode(option)}
        </button>
    ));
    
    return (
        <div className="question">
            <h2 className="question--title">{props.question}</h2>
            {optionBtns}
            <hr />
        </div>
    );
}

Question.propTypes = {
    selectedOptionIdx: PropTypes.number,
    correctOptionIdx: PropTypes.number,
    hasEnded: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string),
    selectOption: PropTypes.func,
    question: PropTypes.string
};

export default Question;
