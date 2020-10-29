import React, { useState, useEffect } from "react"
import PlainTextQuestion from "./PlainTextQuestion"
import MultiChoiceQuestion from "./MultiChoiceQuestion"
import Results from "../../../Pages/Results/Results"

export default function Questions() {
  const [status, setStatus] = useState("QUIZ_LOADING")
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responseId, setResponseId] = useState(0)
  const [processedResponse, setProcessedResponse] = useState(0)
  const [processedImage, setProcessedImage] = useState("")

  useEffect(() => {
    fetch('https://app.trivyeah-backend.wtxtra.agency/api/v1/response/begin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_identifier: Date.now().toString(),
        form_id: 4
      })
    })
      .then(res => res.json())
      .then(data => {
        setResponseId(data.data.id)
      })
      
    fetch('https://app.trivyeah-backend.wtxtra.agency/api/v1/forms/view?id=4')
      .then(res => res.json())
      .then(data => {
        let questions = data.data.sections[0].questions
        setQuestions((questions))
        setStatus('QUIZ_LOADED')
      })
  }, [])

  const isCurrentQuestion = (key) => {
    return currentQuestion === key
  }

  const endQuiz = () => {
    fetch('https://app.trivyeah-backend.wtxtra.agency/api/v1/response/end', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: responseId,
        answers: Object.values(answers)
      })
    })
      .then(res => res.json())
      .then(data => {
        setProcessedResponse(data.data.processed)
        setProcessedImage(data.data.hook_responses[0].response)
        setStatus('QUIZ_ENDED')
      })
  }

  const nextQuestion = () => {
    if (currentQuestion < (questions.length - 1) ){
      setCurrentQuestion(currentQuestion + 1)
      return
    }
    console.log("Here!")
    endQuiz()
  }

  const submitAnswer = (questionId, answerText, answerValue) => {
    let newAnswers = answers
    newAnswers[questionId] = ({
      question_id: questionId,
      text: answerText,
      value: answerValue
    })
    setAnswers(newAnswers)
    nextQuestion()
  }

  // const fetchAnswer = (questionId) => {
  //   return answers[questionId]?.text
  // }

  var rendered = null
  switch (status) {
    case "QUIZ_LOADING":
      rendered = <div class="text-center"><h3>Please wait...</h3></div>
      break;
    case "QUIZ_LOADED":
      rendered = (
        questions.map((question, key) => {
          switch (question.type) {
            case "plain text":
              return <PlainTextQuestion 
                      show={isCurrentQuestion(key)}
                      submitAnswer={submitAnswer} 
                      key={key} 
                      question={question} 
                    />
            case "multiple choice":
              return <MultiChoiceQuestion 
                      show={isCurrentQuestion(key)} 
                      submitAnswer={submitAnswer} 
                      key={key} 
                      question={question} 
                    />
            default:
              return null
          }
        })
      )
      break;
    case "QUIZ_ENDED":
      rendered = <Results grade={processedResponse} certificate={processedImage}  />
      break;
  
    default:
      break;
  }

  return (
    <>
    {
      rendered
    }
    </>
  )
}