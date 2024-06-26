import { useState, useRef } from 'react'
import './App.css'
import { Questions } from './assets/Questions';

function App() {
  let [index, setIndex] = useState(0);
  let [ques, setQues] = useState(Questions[index]);
  const [lock, setLock] = useState(false); //this lets us select only 1 option out of 4
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
   
  let opt1 = useRef(null);
  let opt2 = useRef(null);
  let opt3 = useRef(null);
  let opt4 = useRef(null);

  const optionArray = [opt1, opt2, opt3, opt4]; //doubt

  const checkAnswer = (e, ans) => {
    if(lock === false){
      if(ques.ans === ans){
        e.target.classList.add('correct');
        setLock(true);
        setScore(score + 1);
      }
      else{
        e.target.classList.add('wrong');
        setLock(true);  
        optionArray[ques.ans-1].current.classList.add('correct'); //have to understand later
      }
    }
  }

  const nextQuestion = () => {
    if(lock === true){
      if(index === Questions.length - 1){
        setResult(true);
        return 0;
      }

      setIndex(index + 1);
      // setIndex(Math.floor(Math.random() * index) + 1);
      setQues(Questions[index+1]);
      setLock(false);
      optionArray.map((option) => {
        //doubt here
        option.current.classList.remove('correct');
        option.current.classList.remove('wrong');
        return null;
      })
    }
  }

  const playAgain = () => {
    setIndex(0);
    setQues(Questions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }


  return (
    <>  
    <div className="header">
        <h2>WELCOME TO QUIZZYTOPIA</h2>
    </div>
      <div className="container">

        {result ? <>
        <div className="result">
          <h2>You scored {score} out of {Questions.length}</h2>
          {/* <p>Correct answers: {score}</p>
          <p>Wrong answers: {Questions.length - score}</p> */}
          <button id='play-again' onClick={playAgain}>
            Play again
          </button>
        </div>
        </> : 
        <>
        <div className="question">
          {index + 1}. {ques.question}
        </div>
        <div className="options">
          <ul>
            <li ref={opt1} onClick={(e) => {checkAnswer(e, 1)}}>{ques.option1}</li>
            <li ref={opt2} onClick={(e) => {checkAnswer(e, 2)}}>{ques.option2}</li>
            <li ref={opt3} onClick={(e) => {checkAnswer(e, 3)}}>{ques.option3}</li>
            <li ref={opt4} onClick={(e) => {checkAnswer(e, 4)}}>{ques.option4}</li>
          </ul>
        </div>
        <div className="footer">
          <div className="btn">
            <button onClick={nextQuestion}>Next question</button>
          </div>
          <div className="next">
            <p>{index + 1} out of {Questions.length} questions</p>
          </div>
        </div>
        </>}

      </div>
    </>
  )
}

export default App
