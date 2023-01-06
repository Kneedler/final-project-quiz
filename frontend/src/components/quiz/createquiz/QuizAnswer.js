import React from "react";
import { useState } from "react";
import AddAnswer from "./AddAnswer"

const QuizAnswer = ({ answerText, isCorrect }) => {
    console.log('QuizAnswer', answerText)
    console.log('QuizAnswer', isCorrect)

    const [isCorrectData, setIsCorrectData] = useState(false)
    const [answerTextData, setAnswerTextData] = useState('')
    const [answerList, setAnswerList] = useState([ { answer: "" }])

    console.log('QuizAnswer answerTextData', answerTextData)
    console.log('QuizAnswer isCorrectData', isCorrectData)

// behöver denna wrappas i form? Hur får vi ett text area? och ska vi ha knapp för att lägga till fler frågor här också?
// https://reactjs.org/docs/lifting-state-up.html

const handleAnswerAdd = () => {
    setAnswerList([...answerList, { answer: "" }])
}

const handleAnswerRemove = (index) => {
    const list = [...answerList]
    list.splice(index, 1);
    setAnswerList(list)
}

return(
   <div>
   <div id="answerInput" >
    <label 
    className="addAnswerLabel"
      htmlFor="answer"> 
      <p>Answers</p>
      {answerList.map((singleAnswer, index) => (
        <div key={index}>
        <input
          id="answer"
          type="radio" 
          value="isCorrect"
          checked={isCorrectData === true}
          onChange={() => setIsCorrectData(true)} />
        <input 
          id="answer"
          type="text" 
          value={answerTextData}
          onChange={(e) => setAnswerTextData(e.target.value)} 
          placeholder="answer"
          autoComplete="off" /> 
          {answerList.length - 1 === index && answerList.length < 4 && 
            (<button 
      className="addAnswerBtn"
      type="button"
      onClick={handleAnswerAdd}
      >
      <span>Add Answer</span>
      </button>)}
          {answerList.length > 2 && (
            <button className="removeBtn"
            onClick={() => handleAnswerRemove(index)}>🆇</button>)}
        </div>
      ))}
    </label>
    </div>
    </div>
)
}

export default QuizAnswer