import React, { useState, useLayoutEffect } from 'react'
// import { saveAs } from 'file-saver';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import boltApp from './bolt-app.png'
import boltApp2 from './bolt-app2.png'
import boltApp3 from './bolt-app3.png'
import boltApp4 from './bolt-app4.png'
import secure from './secure.png'
import supported from './supported.png'
import verified from './verified.png'
import car1 from './cars/1.png'
import car2 from './cars/2.png'
import car3 from './cars/3.png'
import car4 from './cars/4.png'
import car5 from './cars/5.png'
import car6 from './cars/6.png'
import car7 from './cars/7.png'
import car8 from './cars/8.png'
import car9 from './cars/9.png'
import car10 from './cars/10.png'
import car11 from './cars/11.png'
import car12 from './cars/12.png'
import car13 from './cars/13.png'
import car14 from './cars/14.png'
import car15 from './cars/15.png'
import car16 from './cars/16.png'
import accident from './sos/accident.png'
import danger from './sos/danger.png'
import music from './sos/music.png'
import price from './sos/price.png'
import traffic from './sos/traffic.png'
import insuranceImage from './insurance-image.png'
import Leaderboard from './Leaderboard';
import Timer from './Timer';
import Header from '../../Utilities/Header/Header';
import correctIcon from './checked.png'
import wrongIcon from './close.png'
import SocialShare from '../../Utilities/SocialShare/SocialShare';

export default function Home() {
  const [ geo,setGeo ] = useState({name: "Uche", hashtag: "NG", country: "Nigeria"})
  // const [ status,setStatus ] = useState("INITIAL")
  const [ status,setStatus ] = useState("START")
  // const [ error,setError ] = useState("")
  const [ image,setImage ] = useState("")
  const [ questionNumber, setQuestionNumber ] = useState(1)
  const [ carAndDriver,setCarAndDriver ] = useState([])
  const [ unscrambled,setUnscrambled ] = useState("")
  const [ SOS,setSOS ] = useState([])
  const [ fourth, setFourth ] = useState(-1)
  const [ fifth, setFifth ] = useState(-1)
  const [ sixthQuestionOptions, setSixthQuestionOptions ] = useState([
    "Chose the problem topic and describe your issue",
    "Select the trip (recent trip or another)",
    "Submit",
    "Go to the support tab",
    "Open your Bolt app"
  ])
  const [ insurance,setInsurance ] = useState("")
  const [ score, setScore ] = useState(0)
  const [ message, setMessage ] = useState("")
  const [ started, setStarted ] = useState(false)
  const [ time, setTime ] = useState((new Date()).getTime() + (8 * 60000))
  const [carsAndDriversIndex, setCarsAndDriversIndex] = useState(-1)
  const [ safeRider, setSafeRider ] = useState("")

  const carsAndDriversScreens = [
    boltApp,
    boltApp2,
    boltApp3,
    boltApp4
  ]

  const carsAndDriversAnswers = [
    [
      {
        index: 6, 
        required: true
      },
      {
        index: 10,
        required: false
      },
      {
        index: 14,
        required: false
      },
      {
        index: 13,
        required: true
      }
    ],
    [
      {
        index: 11,
        required: true
      },
      {
        index: 12,
        required: true
      }
    ],
    [
      {
        index: 0,
        required: true
      },
      {
        index: 1,
        required: true
      },
      {
        index: 4,
        required: false
      },
      {
        index: 8,
        required: true
      }
    ],
    [
      {
        index: 0,
        required: false
      },
      {
        index: 1,
        required: false
      },
      {
        index: 4,
        required: true
      },
      {
        index: 5,
        required: false
      },
      {
        index: 7,
        required: true
      }
    ]
  ]

  useLayoutEffect(() => {
    fetch(`https://services.etin.space/bolt-campaign/api/gratitude/location.php`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setStatus("START")
        setGeo(data)
      })
  }, [])

  // const saveImage = (name) => {
  //   saveAs(image + name, `bolt-protect-${Date.now().toString(16)}.png`)
  // }

  const postQuestion = (message, status) => {
    setMessage(message)
    setStatus("POSTQUESTION")
    setQuestionNumber(questionNumber+1)

    let timing = message.length ? 4000 : 1500

    setTimeout(() => {
      setStatus(status)
    }, timing)
  }

  const submitCarAndDriver = (e) => {
    e.preventDefault()
    let selected = Array.from(e.target.carAndDriver).filter(el => el.checked).map(el => parseInt(el.value))
    setCarAndDriver(selected)
    let message = ""
    let required = ANSWERS.carAndDriver.filter(cd => cd.required).map(cd => cd.index)

    if (required.some(item => selected.indexOf(item) === -1)) {
      message = "Always get in the right car by confirming your driver's number plate and face in your app immediately your request is accepted"
    }
    postQuestion(message, "SECOND")
  }

  const submitUnscrambled = (e) => {
    e.preventDefault()
    let phrase = e.target.unscrambled.value.toUpperCase().trim()
    setUnscrambled(phrase)
    let message = ""
    if(phrase !== ANSWERS.unscrambled) {
      message = "Using the “Share Ride Info” function allows your loved ones see the driver and car details in full and follow you on your trip in real time. "
    }
    let status = geo.country === "Kenya" || geo.country === "South Africa" ? "SOSQUESTION" : "FOURTH"
    postQuestion(message, status)
  }

  const submitSOS = (e) => {
    e.preventDefault()
    let selected = Array.from(e.target.sos).filter(el => el.checked).map(el => parseInt(el.value))
    setSOS(selected)
    let message = ""
    if (JSON.stringify(selected) !== JSON.stringify(ANSWERS.SOS)) {
      message = "The SOS button should only be used in true emergencies so that the emergency services can respond to incidents where they are needed"
    }
    postQuestion(message, "FOURTH")
  }

  const submitFourth = (answer) => {
    setFourth(answer)
    let message = ""
    if(answer !== ANSWERS.fourth) {
      message = "All Bolt rides are tracked and saved so that we know where your ride was at every point of the trip"
    }
    postQuestion(message, "FIFTH")
  }

  const submitFifth = (answer) => {
    setFifth(answer)
    let message = ""
    if(answer !== ANSWERS.fifth) {
      message = "Your ratings and feedback helps us improve future journeys. They are anonymous to your driver, so it is important that you give your honest feedback."
    }
    postQuestion(message, "SIXTH")
  }

  const submitFeedbackOrder = (e) => {
    e.preventDefault()
    let message = ""
    const isWrongOrder = (item, index) => {
      if(item === sixthQuestionOptions[index]){
        return false
      }
      return true
    }
    
    if (ANSWERS.feedbackOrder.some(isWrongOrder)) {
      message = "Our Customer Support team is always on hand to respond to your comments so leaving feedback on the trip in question via in-app support is usually the quickest way to reach us"
    }
    let status = geo.country === "Nigeria" || geo.country === "South Africa" ? "INSURANCEQUESTION" : "FINAL"
    postQuestion(message, status)
  }

  const submitInsurance = (e) => {
    e.preventDefault()
    let phrase = e.target.insurance.value.toUpperCase().trim()
    setInsurance(phrase)
    let message = ""
    if(phrase !== ANSWERS.insurance) {
      message = "“Bolt Trip Protection” offers insurance cover for you and your belongings on every Bolt ride"
    }
    postQuestion(message, "FINAL")
    return
  }

  const submitFinal = (e) => {
    e.preventDefault()
    endGame("Congratulations, you're a safe rider!")
    return
  }

  // const moveFeedbackCursor = (index) => {
  //   if (sixthFormRefs.length > (index + 1)) {
  //     sixthFormRefs[index + 1].focus();
  //   }
  // }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "var(--primary-color)" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightgrey" : "transparent"
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      sixthQuestionOptions,
      result.source.index,
      result.destination.index
    );

    setSixthQuestionOptions(items);
  }

  // const sixthFormRefs = []

  const ANSWERS = {
    carAndDriver: carsAndDriversAnswers[carsAndDriversIndex],
    unscrambled: "SHARE RIDE INFO",
    SOS: [0,1],
    fourth: 0,
    fifth: 4,
    feedbackOrder: [
      "Open your Bolt app",
      "Go to the support tab",
      "Select the trip (recent trip or another)",
      "Chose the problem topic and describe your issue",
      "Submit"
    ],
    insurance: "BOLT TRIP PROTECTION",
  }

  const CARS_DRIVERS = [
    car1,
    car2,
    car3,
    car4,
    car5,
    car6,
    car7,
    car8,
    car9,
    car10,
    car11,
    car12,
    car13,
    car14,
    car15,
    car16
  ]

  const SOS_OPTIONS = [
    accident,
    danger,
    music,
    price,
    traffic
  ]

  const FOURTH_OPTIONS = [
    "Tracked",
    "Followed",
    "Tagged",
    "Convoyed"
  ]

  const FIFTH_OPTIONS = [
    "Star",
    "Stars",
    "Stars",
    "Stars",
    "Stars"
  ]

  const renderStars = (number) => {
    console.log(number)
    let stars = []
    for (let index = 0; index <= number; index++) {
      stars.push(index)
    }
    return stars.map((star, key) => (
      <i key={key} className="fas fa-star primary-text"></i>
    ))
  }

  const calcAnswers = () => {
    let score = 0
    
    let requiredCars = ANSWERS.carAndDriver.filter(cd => cd.required).map(cd => cd.index)
    
    if (requiredCars.every(item => carAndDriver.indexOf(item) !== -1)) {
      score += 20
      score -= carAndDriver.length - ANSWERS.carAndDriver.map(cd => cd.index).length
    }

    if (unscrambled === ANSWERS.unscrambled) {
      score += 10
    }
    if (JSON.stringify(SOS) === JSON.stringify(ANSWERS.SOS)) {
      score += 10
    }
    if (fourth === ANSWERS.fourth) {
      score += 10
    }
    if (fifth === ANSWERS.fifth) {
      score += 10
    }
    ANSWERS.feedbackOrder.forEach((item, index) => {
      if(item === sixthQuestionOptions[index]){
        score += 4
      }
    })
    if (insurance === ANSWERS.insurance) {
      score += 20
    }

    if (score <= 30) {
        setImage("https://firebasestorage.googleapis.com/v0/b/bolt-campaigns.appspot.com/o/bolt-safety-captcha%2FSafety%20captcha%20site2%20web-35.png?alt=media&token=d6991837-1eb8-4369-a881-821a819dd8f8")
        setSafeRider("Safety So-so")
    } else if (score <= 50) {
        setImage("https://firebasestorage.googleapis.com/v0/b/bolt-campaigns.appspot.com/o/bolt-safety-captcha%2FSafety%20captcha%20site2%20web-34.png?alt=media&token=ab2608a0-35e9-4f6d-8c56-f67245d47075")
        setSafeRider("Safety Rookie")
    } else if (score <= 80) {
        setImage("https://firebasestorage.googleapis.com/v0/b/bolt-campaigns.appspot.com/o/bolt-safety-captcha%2FSafety%20captcha%20site2%20web-33.png?alt=media&token=0b8b54e8-62cc-46a6-a75c-22d28aeb4faf")
        setSafeRider("Safety Wiz")
    } else {
        setImage("https://firebasestorage.googleapis.com/v0/b/bolt-campaigns.appspot.com/o/bolt-safety-captcha%2FSafety%20captcha%20site2%20web-32.png?alt=media&token=add7f388-a11a-4349-b286-d418aa9186cc")
        setSafeRider("Safety Champ")
    }
    score = time > Date.now() ? score * ( (time - Date.now())/1000 ) : score
    setScore( Math.round(score) )
  }

  const endGame = (message) => {
    calcAnswers()
    setStarted(false)
    setMessage(message)
    setStatus("ENDGAME")
  }

  const submitNameAndDownloadCertificate = (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let handle = e.target.handle.value
    let social = e.target.social.value

    fetch("https://bolt-campaigns.firebaseio.com/bolt-safety-captcha/high-scores.json", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            country: geo.country,
            category: safeRider,
            socialMedia: social,
            handle: handle,
            score: score
        })
    }).then(data => setStatus("SCORE_SAVED"))
  } 

  const Layout = ({children, ...props}) => (
    <div 
      className={
        `container${props.middle ? 
          " d-flex justify-content-center align-items-center" : ""}${props.textCenter ? " text-center" : ""}`
      } 
      style={
        {
          height: props.middle ?
            "calc(100vh - 150px)" : "auto"
        }
      }
    >
      <div className="row">
        <div  className={`col-12 ${props.animate || props.animate === null ? "animate__animated animate__fadeIn animate__slow" : ""}`}>
          {children}
        </div>
      </div>
    </div>        
  ) 

  const Landing = () => (
    <Layout textCenter>
      <div className="row text-left">
        <div className="col-4 landing-col">
          <div>
            <img src={verified} className="img-fluid img-round landing-img" alt="" />
            <div className="landing-text">
              <span className="landing-label">Verified</span>
              <h1 className="landing-h1 font-weight-bold">BEFORE</h1>
            </div>
          </div>
        </div>
        <div className="col-4 landing-col">
          <div>
            <img src={secure} className="img-fluid img-round landing-img" alt="" />
            <div className="landing-text">
              <span className="landing-label">Secure</span>
              <h1 className="landing-h1 font-weight-bold">DURING</h1>
            </div>
          </div>
        </div>
        <div className="col-4 landing-col">
          <div>
            <img src={supported} className="img-fluid img-round landing-img" alt="" />
            <div className="">
              <span className="landing-label">Supported</span>
              <h1 className="landing-h1 font-weight-bold">AFTER</h1>
            </div>
          </div>
        </div>
      </div>
      <p>
        We're driven by safety <b>before</b>, < b>during</b> and <b>after</b> every ride.
      </p>
      <p>
        Can you prove that you’re a safety champ and can take
        advantage of all our safety features by solving as many
        CAPTCHAs as possible?
      </p>
      <button className="btn btn-primary" onClick={(e) => {setCarsAndDriversIndex(Math.floor(Math.random() * Math.floor(3))); setTime((new Date()).getTime() + (8 * 60000)); setStatus("FIRST"); setStarted(true)}}>Get started</button>
      &nbsp;&nbsp;
      <button className="btn btn-primary" onClick={(e) => setStatus("LEADERBOARD")}>View Leaderboard</button>
    </Layout>
  )

  const FirstQuestion = () => (
    <Layout>
      <div className="my-3 d-flex">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Your ride is here!
        </h1>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <img src={carsAndDriversScreens[carsAndDriversIndex]} className="img-fluid" alt="Your bolt ride" />
        </div>
        <div className="col-md-6">
          <h5>Find your driver and their car</h5>
          <p>Click all boxes that have your driver and their car.</p>
          <p>Look out for your driver's face and the plate number</p>
          <form onSubmit={submitCarAndDriver}>
            <div className="row no-gutters">
            {
              CARS_DRIVERS.map((car, key) => (
                <div key={key} className="col-3">
                  <label className="pic-select-label check">
                    <img src={car} className="img-fluid" alt="" />
                    <input type="checkbox" name="carAndDriver" value={key} />
                    <span className="checkmark checkmark-pic"></span>
                  </label>
                </div>
              ))
            }
              <div className="col-12 mt-3 text-center">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const SecondQuestion = () => (
    <Layout>
      <div className="my-3 d-flex">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Your trip has begun.
        </h1>
      </div>

      <div className="row text-left">
        <div className="col-12">
          <h5>Take your loved ones with you on your journey.</h5>
          <h5>Unscramble the letters to find out how:</h5>
          <h1 className="scrambled-letters d-none d-md-block">
            <span>R</span><span>E</span><span>S</span><span>H</span><span>A</span>
            &nbsp;&nbsp;&nbsp;
            <span>D</span><span>I</span><span>R</span><span>E</span>
            &nbsp;&nbsp;&nbsp;
            <span>O</span><span>N</span><span>I</span><span>F</span></h1>
          <h1 className="scrambled-letters d-md-none">
            <span>R</span><span>E</span><span>S</span><span>H</span><span>A</span>
            <br />
            <span>D</span><span>I</span><span>R</span><span>E</span>
            <br />
            <span>O</span><span>N</span><span>I</span><span>F</span></h1>
          <form onSubmit={submitUnscrambled}>
            <div className="row">
              <div className="col-12">
                <input type="text" name="unscrambled" className="form-control" placeholder="Type phrase here" required />
              </div>
              <div className="col-12 mt-3 text-center text-center">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const SOSQuestion = () => (
    <Layout>
      <div className="my-3 d-flex">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          You're on your way to your destination
        </h1>
      </div>

      <div className="row">
        <div className="col-12">
          <h5>In which of these situations is it appropriate to use the Rider SOS button? (pick all that apply)</h5>
          <form onSubmit={submitSOS}>
            <div className="row">
            {
              SOS_OPTIONS.map((sos, key) => (
                <>
                {key < 3 && 
                <div key={key} className="col-4 mb-3">
                  <label className="pic-select-label check">
                    <img src={sos} className="img-fluid" alt="" />
                    <input type="checkbox" name="sos" value={key} />
                    <span className="checkmark"></span>
                  </label>
                </div>
                }
                </>
              ))
            }
            </div>
            <div className="row">
            {
              SOS_OPTIONS.map((sos, key) => (
                <>
                {key === 3 && 
                <div key={key} className="col-4 mb-3 offset-2">
                  <label className="pic-select-label check">
                    <img src={sos} className="img-fluid" alt="" />
                    <input type="checkbox" name="sos" value={key} />
                    <span className="checkmark"></span>
                  </label>
                </div>
                }
                </>
              ))
            }
            {
              SOS_OPTIONS.map((sos, key) => (
                <>
                {key > 3 && 
                <div key={key} className="col-4 mb-3">
                  <label className="pic-select-label check">
                    <img src={sos} className="img-fluid" alt="" />
                    <input type="checkbox" name="sos" value={key} />
                    <span className="checkmark"></span>
                  </label>
                </div>
                }
                </>
              ))
            }
            </div>
            <div className="row">
              <div className="col-12">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const FourthQuestion = () => (
    <Layout>
      <div className="my-3 d-flex">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          You’re on your way to your destination.
        </h1>
      </div>

      <div className="row">
        <div className="col-12">
          <h5>For added safety on Bolt rides, all trips are:</h5>
            <div className="row">
            {
              FOURTH_OPTIONS.map((option, key) => (
                <button key={key} onClick={() => submitFourth(key)} className="btn btn-secondary btn-full-width">
                  {option}
                </button>
              ))
            }
            </div>
        </div>
      </div>
      
    </Layout>
  )

  const FifthQuestion = () => (
    <Layout>
      <div className="my-3 d-flex">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          You’re on your way to your destination.
        </h1>
      </div>

      <div className="row">
        <div className="col-12">
          <h5>A’s are to the best students, as ______________ are to the best drivers.</h5>
            <div className="row">
            {
              FIFTH_OPTIONS.map((option, key) => (
                <button key={key} onClick={() => submitFifth(key)} className="btn btn-secondary btn-full-width">
                  {renderStars(key)} {option}
                </button>
              ))
            }
            </div>
        </div>
      </div>
      
    </Layout>
  )

  const SixthQuestion = () => (
    <Layout animate={false}>
      <div className="my-3 d-flex">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Your ride is over but you can help us make sure future trips are better by leaving feedback after each trip.
        </h1>
      </div>

      <div className="row">
        <div className="col-12">
          <h5>Arrange these steps chronologically to leave feedback</h5>
          <p>Hold and drag each option to rearrange it</p>
          <p>We won't tell if you look at your app for these 😉</p>
          <div className="row">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                  {
                    sixthQuestionOptions.map((option, key) => (
                      <Draggable key={key} draggableId={`drag-${key}`} index={key}>
                        {(provided, snapshot) => (
                          <div className="btn btn-secondary btn-full-width"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {option}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
        </Droppable>
      </DragDropContext>
          </div>
            <form onSubmit={submitFeedbackOrder}>
              <div className="row">
                <div className="col-12 mt-3 text-center">
                  <button className="btn btn-primary" type="submit">Submit</button>
                </div>
              </div>
            </form>
        </div>
      </div>
      
    </Layout>
  )

  const InsuranceQuestion = () => (
    <Layout>
      <div className="my-3 d-flex">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Bolt trip insurance in {geo.country} is called
        </h1>
      </div>

      <div className="row text-left">
        <div className="col-12">
          <h5>Unscramble the captcha to find out:</h5>
          <img className="img-fluid" src={insuranceImage} alt="Insurance Captcha" />
          <form onSubmit={submitInsurance}>
            <div className="row">
              <div className="col-12">
                <input type="text" name="insurance" className="form-control" placeholder="Type phrase here" required />
              </div>
              <div className="col-12 mt-3 text-center text-center">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const PostQuestion = () => (
    <Layout textCenter>
      <img alt="" className="img-center img-fluid" src={message.length ? wrongIcon : correctIcon} />
      <h1>{message.length ? "Incorrect" : "Correct"}</h1>
      <h5>
        {message}
      </h5>
      <p>
        The next question will load shortly.
      </p>
    </Layout>
  )

  const ScoreDisplay = () => (
    <Layout textCenter>
      <h1>Game Over!</h1>
      <div dangerouslySetInnerHTML={{ __html: message }}></div>
      <h5>
        Your score is {score}. You're a <span className="primary-text">{safeRider}</span>
      </h5>
      <img src={image} className="img-fluid img-center" alt="Bolt Safety Certificate" />
      <p>Learned anything new? Share this quiz with friends so they can take advantage of Bolt’s safety toolkit.</p>
      <SocialShare
        url={window.location.href} 
        text={`I'm a ${safeRider}! Take the quiz to learn about Bolt's safety features and get your safety certificate`}
        tag="BoltProtect"
      />
      <p>
        Submit your name and social media handle to join the leaderboard
      </p>
      <form onSubmit={submitNameAndDownloadCertificate}>
        <div className="row">
          <div className="col-12 mb-3">
            <input type="text" name="name" className="form-control" placeholder="Your Name" required />
          </div>
          <div className="col-12 mb-3">
            <p>How can we contact you?</p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="social" id="inlineRadio1" value="Facebook" />
              <label className="form-check-label" htmlFor="inlineRadio1">Facebook</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="social" id="inlineRadio2" value="Twitter" />
              <label className="form-check-label" htmlFor="inlineRadio2">Twitter</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="social" id="inlineRadio3" value="Instagram" />
              <label className="form-check-label" htmlFor="inlineRadio3">Instagram</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <input type="text" name="handle" className="form-control" placeholder="Your Social Media Handle" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="accept" required />
            <label className="form-check-label" htmlFor="accept">By ticking this box, I agree that Bolt can contact me regarding the results of this quiz.</label>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </Layout>
  )

  const ScoreSaved = () => (
    <Layout textCenter>
      <h1>Your score has been saved!</h1>
      <h5>
        We pick the top members of the leaderboard, so keep playing sharing to stand a bigger chance!
      </h5>
      <button className="btn btn-primary mb-3" onClick={(e) => setStatus("LEADERBOARD")}>View Leaderboard</button>
      &nbsp;&nbsp;
      <a className="btn btn-primary mb-3" href="/">Restart</a>
    </Layout>
  )

  const Final = () => (
    <Layout textCenter>
      <form onSubmit={submitFinal}>
      <div className="captcha">
        <div className="spinner">
          <label>
            <input type="checkbox" required />
            <span className="checkmark"><span>&nbsp;</span></span>
          </label>
        </div>
        <div className="text">
          I'm a safe rider
        </div>
        <div className="logo">
          <img alt="" src="https://forum.nox.tv/core/index.php?media/9-recaptcha-png/"/>
          
        </div>
      </div>
      <div className="col-12 mt-3 text-center">
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
      </form>
    </Layout>
  )

  let content

  switch (status) {
    case "INITIAL":
      content = (
        <Layout middle>
          <h4 className="animate__animated animate__flipInX">
            Welcome! <br />
            Please Wait...
          </h4>
        </Layout>
      )
      break;

    case "START":
      content = <Landing />
      break;
    
    case "FIRST":
      content = <FirstQuestion />
      break;
    
    case "SECOND":
      content = <SecondQuestion />
      break;
    
    case "SOSQUESTION":
      content = <SOSQuestion />
      break;
    
    case "FOURTH":
      content = <FourthQuestion />
      break;
    
    case "FIFTH":
      content = <FifthQuestion />
      break;
    
    case "SIXTH":
      content = <SixthQuestion />
      break;
    
    case "INSURANCEQUESTION":
      content = <InsuranceQuestion />
      break;
    
    case "UPLOADING":
      content = (
        <Layout middle>
          <h4 className="animate__animated animate__flipInX">
            We are generating your image. <br />
            Please Wait...
          </h4>
        </Layout>
      )
      break;

    case "ENDGAME":
      content = <ScoreDisplay />
      break;

    case "SCORE_SAVED":
      content = <ScoreSaved />
      break;

    case "LEADERBOARD":
      content = <Leaderboard limit={30} country={geo.country} />
      break;

    case "POSTQUESTION":
      content = <PostQuestion />
      break;

    case "FINAL":
      content = <Final />
      break;
    
    default:
      break;
  }

  return (
    <>
      <Header>
        {started &&
          <Timer date={time} onEnd={() => endGame("Time's up!")} />
        }
      </Header>
      <div className="col-12 justify-content-center">
        <div className="justify-content-center">
          {content}
        </div>
      </div>
    </>
  )
}
