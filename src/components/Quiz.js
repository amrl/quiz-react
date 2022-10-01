import React from "react";
import Question from "./Question";
import {decode} from "html-entities";
import {nanoid} from "nanoid";

function Quiz() {
    const [quiz, setQuiz] = React.useState([]);
    const [hasEnded, setHasEnded] = React.useState(false);
    const [replay, setReplay] = React.useState(false);

    React.useEffect(() => {
        function refine(data) {
            return data.results.map(qn => {
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

        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => refine(data))
            .then(qns => setQuiz(qns))
    }, [replay]);

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
        if (quiz.every(qn => qn.selectedOptionIdx !== -1)) {
            setHasEnded(true);
        } else {
            alert("Some questions are unanswered!");
        }
    }

    function setSelectedOption(qnKey, selectedOptionIdx) {
        setQuiz(qns => qns.map(qn => ({
                ...qn,
                selectedOptionIdx: qn.key === qnKey ?
                    selectedOptionIdx :
                    qn.selectedOptionIdx
            }
        )));
    }

    const questionElements = quiz.map(qn => (
        <Question
            key={qn.key}
            question={qn.question}
            options={qn.options}
            selectOption={selectedOptionIdx => setSelectedOption(qn.key, selectedOptionIdx)}
            correctOptionIdx={qn.correctOptionIdx}
            selectedOptionIdx={qn.selectedOptionIdx}
            hasEnded={hasEnded}
        />
    ));

    return (
        <div className="quiz">
            {questionElements}
            
            {hasEnded ?
                <div className="quiz-end">
                    <h2 className="quiz-end--score">
                        You had {getQuizScore()} / {quiz.length} correct answers!
                    </h2>
                    <button
                        className="quiz-end--replay-btn"
                        onClick={handleReplayClick}
                    >
                        Play again
                    </button>
                </div>
            :
                <div className="quiz-play">
                    {quiz.length > 0 &&
                        <button
                            className="quiz-play--check-btn"
                            onClick={handleCheckAnsClick}
                        >
                            Check answers
                        </button>
                    }
                </div>
            }
        </div>
    );
}

export default Quiz;