import { useState } from 'react';

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
  },
  {
    id: 3,
    question: "What’s the quickest way to estimate market size for a new scooter brand in NYC?",
    choices: [
      "Survey 5,000 people",
      "Use bottom-up TAM logic",
      "Use competitor revenue as a proxy",
      "Ask a VC firm"
    ],
    answer: 1,
    explanation: "Bottom-up TAM logic is often best for estimating in cases like this."
  },
  {
    id: 4,
    question: "Which Excel shortcut adds a new worksheet?",
    choices: ["Ctrl + W", "Ctrl + N", "Shift + F11", "Ctrl + Tab"],
    answer: 2,
    explanation: "Shift + F11 inserts a new worksheet."
  },
  {
    id: 5,
    question: "In a case interview, when should you summarize the framework aloud?",
    choices: [
      "After the interview is over",
      "Before you write it down",
      "Immediately after you draw it",
      "Only if the interviewer asks"
    ],
    answer: 2,
    explanation: "Always talk through your framework after drawing it to show structure."
  }
];

export default function GameQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizData[step];

  const handleChoice = (index) => {
    setSelectedChoice(index);
    setShowExplanation(true);
    if (index === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setShowExplanation(false);
    setStep(step + 1);
  };

  if (step >= quizData.length) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Game Over</h1>
        <p>Your score: {score} / {quizData.length}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Question {step + 1}</h2>
      <p>{currentQuestion.question}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(index)}
            disabled={showExplanation}
            style={{
              padding: '0.75rem',
              borderRadius: '6px',
              backgroundColor: selectedChoice === index ? '#ddd' : '#fff',
              border: '1px solid #ccc',
              cursor: showExplanation ? 'default' : 'pointer'
            }}
          >
            {choice}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
          <p>
            {selectedChoice === currentQuestion.answer ? "✅ Correct! " : "❌ Incorrect. "}
            {currentQuestion.explanation}
          </p>
          <button onClick={handleNext} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
