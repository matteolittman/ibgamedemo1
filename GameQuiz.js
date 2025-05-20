import { useState, useEffect } from 'react';
import axios from 'axios';

const quizData = [
  {
    id: 1,
    question: "A client’s profits have dropped. What’s the FIRST thing you ask?",
    choices: [
      "Can we cut headcount?",
      "What’s the breakdown of revenue vs. cost changes?",
      "Has the competitor landscape shifted?",
      "Can we raise prices?"
    ],
    answer: 1,
    explanation: "Always start with a split between revenue and costs before diving deeper."
  },
  {
    id: 2,
    question: "What’s a reasonable EBITDA multiple for a stable manufacturing firm?",
    choices: ["2x", "5x", "9x", "15x"],
    answer: 2,
    explanation: "Typical ranges for stable firms are around 7–10x."
  }
];

export default function GameQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const currentQuestion = quizData[step];

  const handleChoice = (index) => {
    setSelectedChoice(index);
    setShowExplanation(true);
    if (index === currentQuestion.answer) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedChoice(null);
    setStep(step + 1);
  };

  if (step >= quizData.length) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Game Over</h1>
        <p>Your score: {score} / {quizData.length}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Question {step + 1}</h2>
      <p>{currentQuestion.question}</p>
      <div>
        {currentQuestion.choices.map((choice, index) => (
          <button key={index} onClick={() => handleChoice(index)} disabled={showExplanation}>
            {choice}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div style={{ marginTop: 10 }}>
          <p>
            {selectedChoice === currentQuestion.answer ? "✅ Correct! " : "❌ Incorrect. "}
            {currentQuestion.explanation}
          </p>
          <button onClick={nextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}
