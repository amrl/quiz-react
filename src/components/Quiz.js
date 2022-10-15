import React from "react";
import Question from "./Question";
import Controls from "./Controls";
import {decode} from "html-entities";
import {nanoid} from "nanoid";

function Quiz() {
    const [quiz, setQuiz] = React.useState([]);
    const [hasEnded, setHasEnded] = React.useState(false);
    const [score, setScore] = React.useState(
        JSON.parse(localStorage.getItem("score"))
        || {currCorrect: 0, totalCorrect: 0, totalAnswered: 0}
    );

    React.useEffect(() => {
        if (!hasEnded) {
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                .then(resp => resp.json())
                .then(data => setup(data))
                .then(qns => setQuiz(qns));
        }
    }, [hasEnded]);

    React.useEffect(() => {
        localStorage.setItem("score", JSON.stringify(score));
    }, [score]);

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

    function getCurrCorrectScore() {
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
    }

    function handleResetClick() {
        setQuiz([]);
        setScore({currCorrect: 0, totalCorrect: 0, totalAnswered: 0});
        setHasEnded(false);
    }

    function handleCheckAnsClick() {
        if (quiz.some(qn => qn.selectedOptionIdx === -1)) {
            alert("Some questions are unanswered!");
            return;
        }
        
        const currCorrectScore = getCurrCorrectScore();
        setScore(prevScore => ({
            currCorrect: currCorrectScore,
            totalCorrect: prevScore.totalCorrect + currCorrectScore,
            totalAnswered: prevScore.totalAnswered + quiz.length
        }));
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

            <Controls
                hasEnded={hasEnded}
                score={score}
                quiz={quiz}
                handleReplayClick={handleReplayClick}
                handleResetClick={handleResetClick}
                handleCheckAnsClick={handleCheckAnsClick}
            />
        </div>
    );
}

export default Quiz;
