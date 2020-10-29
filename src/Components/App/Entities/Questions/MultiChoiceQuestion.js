import React from 'react'
import Option from './Option'

export default function MultiChoiceQuestion({ show, question, submitAnswer, ...rest }) {
  const selectOption = (questionId, answerText, answerValue) => {
    submitAnswer(questionId, answerText, answerValue)
  }

  return (
    <div className="Question" style={{
        display: show ? 'block' : 'none'
      }}
    >
      <h4 className="col-sm-12">
        {question.text}
      </h4>
      {
        question.options.map((option, optionKey) => {
          return (
            <Option
              key={optionKey}
              label={optionKey}
              onClick={selectOption}
              question={question.id}
              value={option.value}
              text={option.text}
            />
          )
        })
      }
    </div>
  )
}