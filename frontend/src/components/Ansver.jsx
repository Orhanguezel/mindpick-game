import React from "react";

const Answer = ({ answer, isCorrect, feedback }) => {
    let resultMessage = null;

    if (isCorrect !== undefined) {
        resultMessage = isCorrect ? "Right answer" : "No, this is not a correct answer";
    }

    return (
        <div>
            <h3>Your answer: {answer}</h3>
            {resultMessage && <p>{resultMessage}</p>}
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default Answer;