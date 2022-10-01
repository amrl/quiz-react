import React from "react"

function Question(props) {
    return (
        <div className="question">
            <h2 className="question--title">{props.question}</h2>
        </div>
    )
}

export default Question
