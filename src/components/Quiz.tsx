import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Bir araç 60 km/sa hızla 2 saat boyunca giderse, ne kadar yol alır?",
    options: ["90 km", "120 km", "150 km", "180 km"],
    correct: 1,
    difficulty: 'easy',
    explanation: "60 km/sa hızla 2 saat: 60 × 2 = 120 km yol alır"
  },
  {
    id: 2,
    text: "Bir araç sabit 90 km/sa hızla 30 dakika giderse kaç km yol alır?",
    options: ["30 km", "45 km", "60 km", "75 km"],
    correct: 1,
    difficulty: 'medium',
    explanation: "90 km/sa × 0.5 sa = 45 km yol alır"
  },
  {
    id: 3,
    text: "Bir aracın hız-zaman grafiğinde zaman eksenine paralel düz bir çizgi görülüyorsa, bu hareket için ne söylenebilir?",
    options: [
      "Araç hızlanıyor",
      "Araç sabit hızla gidiyor",
      "Araç yavaşlıyor",
      "Araç duruyor"
    ],
    correct: 1,
    difficulty: 'hard',
    explanation: "Hız-zaman grafiğinde yatay çizgi, sabit hızlı hareketi gösterir"
  }
];

export function Quiz() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const getPoints = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 5;
      case 'medium': return 10;
      case 'hard': return 15;
      default: return 0;
    }
  };

  const handleDifficultySelect = (difficulty: string) => {
    const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
    const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    setSelectedDifficulty(difficulty);
    setCurrentQuestion(randomQuestion);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (selectedOption: number) => {
    if (!currentQuestion) return;
    
    const points = getPoints(currentQuestion.difficulty);
    const isCorrect = selectedOption === currentQuestion.correct;
    
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);
    setScore(prev => prev + (isCorrect ? points : -3));
  };

  const getOptionStyle = (optionIndex: number) => {
    if (selectedAnswer === null) return "bg-white";
    
    if (optionIndex === currentQuestion?.correct) {
      return "bg-green-100 border-green-500";
    }
    if (selectedAnswer === optionIndex) {
      return "bg-red-100 border-red-500";
    }
    return "bg-white";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Test</h2>
      
      <div className="text-lg font-semibold mb-4">
        Puan: {score}
      </div>

      {!currentQuestion ? (
        <div className="space-y-4">
          <p className="text-lg mb-4">Zorluk seviyesi seçin:</p>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleDifficultySelect('easy')}
              className="p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              Kolay Soru (5 puan)
            </button>
            <button
              onClick={() => handleDifficultySelect('medium')}
              className="p-4 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              Zor Soru (10 puan)
            </button>
            <button
              onClick={() => handleDifficultySelect('hard')}
              className="p-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              Çok Zor Soru (15 puan)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <span className={`px-2 py-1 rounded text-sm ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getPoints(currentQuestion.difficulty)} puan
            </span>
            <p className="text-lg font-medium">{currentQuestion.text}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-3 border-2 rounded-lg text-left transition-colors ${
                  getOptionStyle(index)
                } ${
                  selectedAnswer === null
                    ? 'hover:bg-gray-50'
                    : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correct
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}>
              {currentQuestion.explanation}
            </div>
          )}

          <button
            onClick={() => {
              setCurrentQuestion(null);
              setSelectedDifficulty(null);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yeni Soru
          </button>
        </div>
      )}
    </div>
  );
}