import './App.css';
import NavBar from "./components/NavBar";
import TriviaCardSet from './components/TriviaCardSet';
import questionData from "./questionData.json";

function preProcessCardData(){
  return questionData.map(question => {
    return {
      ...question,
      isCorrect: false,
      selectedAnswer: false,
      allAnswers: [...question.incorrect, question.correct],
    }
  });
}

function App() {
  const questions = preProcessCardData();
  return (
    <div className="container-fluid">
      <NavBar />
      <hr />
      <TriviaCardSet questions={questions} />
    </div>
  );
}

export default App;
