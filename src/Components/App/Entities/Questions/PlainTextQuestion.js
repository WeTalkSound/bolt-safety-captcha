import React, { useState } from 'react'
import Button from '../../../Utilities/Button/Button'

export default function PlainTextQuestion({ show, question, submitAnswer, ...rest }) {
  const [answerValue, setAnswerValue] = useState("")
  const [status, setStatus] = useState("")
  const updateAnswer = (e) => {
    let answer = e.target.value
    setAnswerValue(answer)
  }
  const submit = () => {
    if( answerValue.length ) {
      submitAnswer(question.id, answerValue, answerValue)
      return
    }
    setStatus("Please enter a value.")
  }

  return (
    <div 
      className="Question"
      style={{
        display: show ? 'block' : 'none'
      }}
    >
      <h4>{question.text}</h4>
      <input
        placeholder=""
        onChange={updateAnswer}
        value={answerValue}
        id="name"
        name="name"
        type="text"
        className="form-control mb-3"
      />
      <p>{ status }</p>
      <Button onClick={submit}>Submit</Button>
    </div>
  )
}