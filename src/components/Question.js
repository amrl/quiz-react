import React from "react";
import {decode} from "html-entities";

function Question(props) {    
    function getBtnClass(optionIdx) {
        const {selectedOptionIdx, correctOptionIdx, hasEnded} = props;

        if (hasEnded) {
            if (optionIdx === correctOptionIdx) {
                return "correct-option"
            } else if (optionIdx === selectedOptionIdx) {
                return "wrong-selected-option"
            } else {
                return "remaining-option"
            }
        } else {
            if (optionIdx === selectedOptionIdx) {
                return "selected-option"
            } else {
                return ""
            }
        }
    }

    const optionBtns = props.options.map((option, optionIdx) => (
        <button
            key={optionIdx}
            className={`question--option-btn ${getBtnClass(optionIdx)}`}
            onClick={() => props.selectOption(optionIdx)}
        >
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

export default Question;
