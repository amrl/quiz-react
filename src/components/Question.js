import React from "react";
import {decode} from "html-entities";
import classNames from "classnames";

function Question({question, options, correctOptionIdx, selectOption, hasEnded, selectedOption}) {    
    const optionBtns = options.map((option, optionIdx) => (
        <button
            key={optionIdx}
            className={classNames({
                "question--option-btn": true,
                "selected-option": optionIdx === selectedOption,
                "correct-option": hasEnded && optionIdx === correctOptionIdx,
                "wrong-option": hasEnded && optionIdx === selectedOption
            })}
            onClick={() => selectOption(optionIdx)}
        >
            {decode(option)}
        </button>
    ))
    
    return (
        <div className="question">
            <h2 className="question--title">{question}</h2>
            {optionBtns}
            <hr />
        </div>
    )
}

export default Question;
