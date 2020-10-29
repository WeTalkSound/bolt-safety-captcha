import React from 'react'

export default function Option(props) {
  const label = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    return (
      <div
        onClick={() => { props.onClick(props.question, props.text, props.value) } }
        className={"btn-primary btn quiz-option mb-3"}
      >
        <div className="label">
          { label[props.label] + ". " }
        </div>
        <p>{ props.text }</p>
      </div>
    )
}