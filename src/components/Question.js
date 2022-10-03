import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  let timer = undefined;
  useEffect(() => {
    // timer for ended time and trigger rerender
    timer = setTimeout(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1)
    }, 1000);

    if (timeRemaining === 0) {
      setTimeRemaining((timeRemaining) => timeRemaining = 10);
      onAnswered(false)
      // clearTimeout(timer)
    }

    return function () {
      clearTimeout(timer)
    }
    // clearInterval(timer)

  }, [timeRemaining,])

  function handleAnswer(isCorrect) {
    setTimeRemaining((timeRemaining) => timeRemaining = 10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
