import React, { useState } from "react";
import FinalScoreCard from "./FinalScoreCard";
import TriviaCard from "./TriviaCard";

const TriviaCardSet = ({questions}) => {
    const [currentCardIndex, setCurrentCardByIndex] = useState(0);
    const [quizSubmitted,setQuizSubmitted] = useState(false);
    const [score, setQuizScore] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const isLastQuestion = questions.length === (currentCardIndex + 1);

    function goToNextQuestion(){
        if (isLastQuestion) {
            return;
        } else {
            setCurrentCardByIndex(currentCardIndex + 1);
        }
    }

    function resetQuestions(){
        questions.forEach(question => {
            question.isCorrect = false;
            question.selectedAnswer = false;
        });
    }

    function saveSelectedAnswer(selectedAnswer, index) {
            const currentQuestion = questions[index];
            currentQuestion.selectedAnswer = selectedAnswer;
            currentQuestion.isCorrect = selectedAnswer === currentQuestion.correct;
    }

    function submitQuiz(){
        setQuestionCount(questions.length);
        const correctAnswerCount = questions.filter(q => q.isCorrect).length;
        setQuizScore(correctAnswerCount);
        setQuizSubmitted(true);
    }

    function restartQuiz(){
        resetQuestions();
        setQuizSubmitted(false);
        setCurrentCardByIndex(0);

    }

    if (quizSubmitted) {
        return <FinalScoreCard questionCount={questionCount} score={score} questions={questions} restartQuiz={restartQuiz} />
    } else {
        return questions.map((question, index) => {
            return <TriviaCard 
                key={index} 
                index={index} 
                isLastQuestion={isLastQuestion} 
                question={question} 
                currentCardIndex={currentCardIndex} 
                goToNextQuestion={goToNextQuestion}
                saveSelectedAnswer={saveSelectedAnswer}
                submitQuiz={submitQuiz}
            />
        });
    }

};

export default TriviaCardSet;