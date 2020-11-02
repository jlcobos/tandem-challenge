import React from 'react';
import { Card, Button, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const FinalScoreCard = ({questions,score, questionCount, restartQuiz}) => {
  return (
      <Card body>
        <CardTitle>All Done!</CardTitle>
        <CardText>Your answered {score} out of {questionCount} questions correctly</CardText>
        <Questions questions={questions} />
        <Button color="primary" onClick={restartQuiz}>Try Again</Button>
      </Card>
  );
};

function Questions({questions}) {
    return (
        <ListGroup className="p-5" flush>
            {questions.map((question, index) => {
                const icon = question.isCorrect ? faCheck : faTimes; 
                const iconColor = question.isCorrect ? "text-success" : "text-danger";
                return (
                    <ListGroupItem>
                        {question.question}
                        <div>
                            <FontAwesomeIcon className={`mr-2 ${iconColor}`} icon={icon} size="lg" />
                            <b>{question.selectedAnswer}</b>
                        </div>
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    )
}

export default FinalScoreCard;