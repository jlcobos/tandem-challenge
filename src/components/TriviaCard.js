import React, { useState } from "react";
import { Card, Button, CardTitle, CardText, CardFooter, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Alert from "./Alert";

const TriviaCard = ({question: Q, saveSelectedAnswer, currentCardIndex, index, goToNextQuestion, isLastQuestion, submitQuiz}) => {
  const [selectedAnswer, setAnswer] = useState(null);
  const [renderAlert, setRenderAlert] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const {question, incorrect, correct  } =  Q;
  const answers = [...incorrect, correct];
  const currentCardClass = currentCardIndex === index ? "" : "d-none";

  function processSubmit(index){
    setRenderAlert(false);
    if (selectedAnswer !== null) {
      saveSelectedAnswer(selectedAnswer, index);
      setAnswerSubmitted(true);
      setRenderAlert(false);
    } else {
      setRenderAlert(true);
    }
  }

  function next(){
    setAnswerSubmitted(false);
    goToNextQuestion();
  }

  return (
    <Row className={currentCardClass }>
      <Col sm="6" className="mx-auto">
        <Card body>
          <Alert renderAlert={renderAlert} alertText="Select an answer before submitting" />
        <CardTitle>{question}</CardTitle>
          <Answers answers={answers} setAnswer={setAnswer} selectedAnswer={selectedAnswer} answerSubmitted={answerSubmitted} correctAnswer={correct} />
          <CardFooter className="px-0 d-flex justify-content-between">
          <SubmitAnswer processSubmit={processSubmit} index={index} answerSubmitted={answerSubmitted} />
          <GoToNextQuestionOrSubmit next={next} submitQuiz={submitQuiz} isLastQuestion={isLastQuestion} answerSubmitted={answerSubmitted} />
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export default TriviaCard;

function Answers({answers, setAnswer, selectedAnswer, answerSubmitted, correctAnswer }) {
  if (answerSubmitted) {
    return <CorrectAnswer correctAnswer={correctAnswer} selectedAnswer={selectedAnswer} />
  } else {
    return answers.map((answer, index) => {
      const number = index + 1;
      const selectedAnswerColor = selectedAnswer === answer ? "info" : "outline-info";
  
      return (
        <Button key={index} color={selectedAnswerColor} className="d-flex align-items-center my-2" onClick={() => setAnswer(answer)}>
          <CardText className="mr-2">
            {number}:
          </CardText>
          <CardText className="font-italic">
            {answer}
          </CardText>  
        </Button>
      )
    });
  }
}

function CorrectAnswer({correctAnswer, selectedAnswer}) {
  const isCorrect = correctAnswer === selectedAnswer;
  const answerIcon = isCorrect ? faCheck : faTimes;
  const iconColor = isCorrect ? "text-success" : "text-danger";
  return (
    <div>
      <p>
        The correct answer is: <b>{correctAnswer}</b>
      </p>
      <p>
      <FontAwesomeIcon className={`mx-2 ${iconColor}`} icon={answerIcon} size="lg" />
        Your answer: <b>{selectedAnswer}</b>
      </p>
    </div>
  )
}

function SubmitAnswer({processSubmit, index, answerSubmitted}){
  if (answerSubmitted) {
    return null;
  } else {
    return (
      <Button color="primary" className="d-flex align-items-center" onClick={() => processSubmit(index)}>
      <CardText>Submit Answer</CardText>
    </Button>
    );
  }
}

function GoToNextQuestionOrSubmit({next, submitQuiz, isLastQuestion, answerSubmitted}){
  console.log(isLastQuestion)
  const buttonText = isLastQuestion ? "Submit Quiz" : "Next Question";
  const onClickFunction = isLastQuestion ? submitQuiz : next;
  if (answerSubmitted) {
    return (
      <Button color="warning" className="d-flex align-items-center" onClick={onClickFunction}>
        <CardText>{buttonText}</CardText>
      </Button>
    );
  } else {
    return null;
  }
}