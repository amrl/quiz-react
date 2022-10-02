import React from "react";
import Question from "./Question";
import {decode} from "html-entities";
import {nanoid} from "nanoid";

function Quiz() {
    const [quiz, setQuiz] = React.useState([]);
    const [hasEnded, setHasEnded] = React.useState(false);
    const [replay, setReplay] = React.useState(false);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(resp => resp.json())
            .then(data => setup(data))
            .then(qns => setQuiz(qns));
    }, [replay]);

    function setup(apiData) {
        return apiData.results.map(qn => {
            // insert correct answer randomly among incorrect options
            const options = qn.incorrect_answers;
            const randInsertionIdx = Math.floor(Math.random() * (options.length + 1));
            options.splice(randInsertionIdx, 0, qn.correct_answer);
            
            return {
                key: nanoid(),
                question: decode(qn.question),
                options: options,
                correctOptionIdx: randInsertionIdx,
                selectedOptionIdx: -1
            };
        });
    }

    function getQuizScore() {
        let score = 0;
        for (const qn of quiz) {
            if (qn.selectedOptionIdx === qn.correctOptionIdx) {
                score++;
            }
        }
        
        return score;
    }
    
    function handleReplayClick() {
        setQuiz([]);
        setHasEnded(false);
        setReplay(prevReplay => !prevReplay);
    }

    function handleCheckAnsClick() {
        if (quiz.some(qn => qn.selectedOptionIdx === -1)) {
            alert("Some questions are unanswered!");
            return;
        }

        setHasEnded(true);
    }

    function setSelectedOption(qnKey, optionIdx) {
        setQuiz(qns => qns.map(qn => (
            {
                ...qn,
                selectedOptionIdx: qn.key === qnKey
                    ? optionIdx
                    : qn.selectedOptionIdx
            }
        )));
    }

    const questionElements = quiz.map(qn => (
        <Question
            key={qn.key}
            {...qn}
            selectOption={optionIdx => setSelectedOption(qn.key, optionIdx)}
            hasEnded={hasEnded}
        />
    ));

    return (
        <div className="quiz">
            {quiz.length > 0
                ? questionElements
                : <h1 className="quiz--load-msg">Loading quiz...</h1>
            }
            
            {hasEnded &&
                <div className="quiz-end">
                    <h2 className="quiz-end--score">
                        You have {getQuizScore()} / {quiz.length} correct answers!
                    </h2>
                    <button
                        className="quiz-end--replay-btn"
                        onClick={handleReplayClick}>
                        Play again
                    </button>
                </div>
            }

            {!hasEnded && quiz.length > 0 &&
                <div className="quiz-play">
                    <button
                        className="quiz-play--check-btn"
                        onClick={handleCheckAnsClick}>
                        Check answers
                    </button>
                </div>
            }
        </div>
    );
}

export default Quiz;
