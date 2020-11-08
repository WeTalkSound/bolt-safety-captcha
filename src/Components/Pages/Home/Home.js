import React, { useState, useLayoutEffect } from 'react'
import { saveAs } from 'file-saver';
import boltApp from './bolt-app.png'
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
import driver1 from './drivers/1.png'
import driver2 from './drivers/2.png'
import driver3 from './drivers/3.png'
import driver4 from './drivers/4.png'
import driver5 from './drivers/5.png'
import driver6 from './drivers/6.png'
import driver7 from './drivers/7.png'
import driver8 from './drivers/8.png'
import driver9 from './drivers/9.png'
import driver10 from './drivers/10.png'
import driver11 from './drivers/11.png'
import driver12 from './drivers/12.png'
import driver13 from './drivers/13.png'
import driver14 from './drivers/14.png'
import driver15 from './drivers/15.png'
import driver16 from './drivers/16.png'
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

export default function Home() {
  const [ geo,setGeo ] = useState({name: "Uche", hashtag: "NG", country: "Nigeria"})
  const [ status,setStatus ] = useState("INITIAL")
  // const [ error,setError ] = useState("")
  const [ image,setImage ] = useState("")
  const [ questionNumber, setQuestionNumber ] = useState(1)
  const [ car,setCar ] = useState(-1)
  const [ driver,setDriver ] = useState(-1)
  const [ unscrambled,setUnscrambled ] = useState("")
  const [ SOS,setSOS ] = useState([])
  const [ fourth, setFourth ] = useState(-1)
  const [ fifth, setFifth ] = useState(-1)
  const [ feedbackOrder, setFeedbackOrder ] = useState([])
  const [ insurance,setInsurance ] = useState("")
  const [ score, setScore ] = useState(0)
  const [ message, setMessage ] = useState("")
  const [ started, setStarted ] = useState(false)
  const [ time, setTime ] = useState((new Date()).getTime() + (8 * 60000))

  console.log(geo);
  console.log(setTime);

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

  const saveImage = (name) => {
    saveAs(image + name, `bolt-protect-${Date.now().toString(16)}.png`)
  }

  const postQuestion = (message, status) => {
    setMessage(message)
    setStatus("POSTQUESTION")
    setQuestionNumber(questionNumber+1)

    let timing = message.length ? 5000 : 3000

    setTimeout(() => {
      setStatus(status)
    }, timing)
  }

  const submitDriver = (e) => {
    e.preventDefault()
    let answer = parseInt(e.target.driver.value);
    setDriver(answer)
    let message = ""
    if(answer !== ANSWERS.driver) {
      message = "Your driver's picture can be seen on the order progress screen in your app immediately your request is accepted"
    }
    postQuestion(message, "SECOND")
  }

  const submitCar = (e) => {
    e.preventDefault()
    let answer = parseInt(e.target.car.value)
    setCar(answer)
    let message = ""
    if(answer !== ANSWERS.car) {
      message = "Your ride's number plate is visible on the order progress screen in your app immediately your request is accepted"
    }
    postQuestion(message, "FIRST-B")
  }

  const submitUnscrambled = (e) => {
    e.preventDefault()
    let phrase = e.target.unscrambled.value.toUpperCase()
    setUnscrambled(phrase)
    let message = ""
    if(phrase !== ANSWERS.unscrambled) {
      message = "The “SHARE YOUR ETA” function allows your loved ones follow every turn on your trip in real time from any internet enabled device"
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
      message = "Your ratings help us maintain standards on the Bolt platform. They are anonymous to your driver so it is important that you give your honest feedback"
    }
    postQuestion(message, "SIXTH")
  }

  const submitFeedbackOrder = (e) => {
    e.preventDefault()
    let elements = Array.from(e.target.elements)
    let fbOrder = elements.filter(element => element.name.includes("feedbackOrder")).map(element => parseInt(element.value))
    setFeedbackOrder(fbOrder)
    let message = ""
    const isWrongOrder = (item, index) => {
      console.log(item, fbOrder[index])
      if(item === fbOrder[index]){
        return false
      }
      return true
    }
    console.log(ANSWERS.feedbackOrder.some(isWrongOrder));
    
    if (ANSWERS.feedbackOrder.some(isWrongOrder)) {
      message = "Our Customer Support team is always on hand to respond to your comments so leaving feedback on the trip in question via in-app support is usually the quickest way to reach us"
    }
    let status = geo.country === "Nigeria" || geo.country === "South Africa" ? "INSURANCEQUESTION" : "FINAL"
    postQuestion(message, status)
  }

  const submitInsurance = (e) => {
    e.preventDefault()
    let phrase = e.target.insurance.value.toUpperCase()
    setInsurance(phrase)
    let message = ""
    if(phrase !== ANSWERS.insurance) {
      message = "“Bolt Trip Protection” covers you and your possessions on every Bolt ride"
    }
    postQuestion(message, "FINAL")
    return
  }

  const submitFinal = (e) => {
    e.preventDefault()
    endGame("Congratulations, you're a safe rider!")
    return
  }

  const moveFeedbackCursor = (index) => {
    if (sixthFormRefs.length > (index + 1)) {
      sixthFormRefs[index + 1].focus();
    }
  }

  const sixthFormRefs = []

  const ANSWERS = {
    car: 3,
    driver: 6,
    unscrambled: "SHARE YOUR ETA",
    SOS: [0,1],
    fourth: 0,
    fifth: 4,
    feedbackOrder: [5,1,6,2,4,3],
    insurance: "BOLT TRIP PROTECTION",
  }

  const CARS = [
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

  const DRIVERS = [
    driver1,
    driver2,
    driver3,
    driver4,
    driver5,
    driver6,
    driver7,
    driver8,
    driver9,
    driver10,
    driver11,
    driver12,
    driver13,
    driver14,
    driver15,
    driver16
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
  const SIXTH_OPTIONS = [
    "Go to the support tab",
    "Choose the problem topic",
    "Submit",
    "Click on “Get help” and describe your issue",
    "Open your Bolt app",
    "Select the trip (recent trip or another)"
  ]

  const calcAnswers = () => {
    let score = 0
    if (car === ANSWERS.car) {
      score += 10
    }
    if (driver === ANSWERS.driver) {
      score += 10
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
      if(item === feedbackOrder[index]){
        score += 2.5
      }
    })
    if (insurance === ANSWERS.insurance) {
      score += 20
    }

    setImage(`https://services.etin.space/bolt-campaign/api/safety-captcha/?score=${score}&name=`)
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

    fetch("https://bolt-campaigns.firebaseio.com/bolt-safety-captcha/high-scores.json", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            country: geo.country,
            handle: handle,
            score: score
        })
    }).then(data => setStatus("SCORE_SAVED"))
    saveImage(name)
  } 

  const Layout = ({children, ...props}) => (
    <div 
      className={
        `container${props.middle ? 
          " d-flex justify-content-center align-items-center" : ""}`
      } 
      style={
        {
          height: props.middle ?
            "calc(100vh - 150px)" : "auto"
        }
      }
    >
      <div className="row">
        <div  className="col-12 animate__animated animate__fadeIn animate__slow">
          {children}
        </div>
      </div>
    </div>        
  ) 

  const Landing = () => (
    <Layout>
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
        We believe that safety is in the little things that happen <b>before</b>, < b>during</b> and <b>after</b> every ride.
      </p>
      <p>
        Can you prove that you’re a safety champ and can take
        advantage of all our safety features by solving as many
        CAPTCHAs as possible?
      </p>
      <button className="btn btn-primary" onClick={(e) => {setStatus("FIRST"); setStarted(true)}}>Get started</button>
      &nbsp;&nbsp;
      <button className="btn btn-primary" onClick={(e) => setStatus("LEADERBOARD")}>View Leaderboard</button>
    </Layout>
  )

  const FirstQuestion = () => (
    <Layout>
      <div className="my-3 d-flex align-items-center">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Your ride is here!
        </h1>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <img src={boltApp} className="img-fluid" alt="Your bolt ride" />
        </div>
        <div className="col-md-6">
          <h5>A. Find your driver's car</h5>
          <p>Click the image that has your driver's car and click submit</p>
          <p>Look out for the plate number</p>
          <form onSubmit={submitCar}>
            <div className="row no-gutters">
            {
              CARS.map((car, key) => (
                <div key={key} className="col-3">
                  <label className="pic-select-label check">
                    <img src={car} className="img-fluid" alt="" />
                    <input type="radio" name="car" value={key} required />
                    <span className="checkmark"></span>
                  </label>
                </div>
              ))
            }
              <div className="col-12 mt-3">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const FirstQuestionB = () => (
    <Layout>
      <div className="my-3 d-flex align-items-center">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Your ride is here!
        </h1>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <img src={boltApp} className="img-fluid" alt="Your bolt ride" />
        </div>
        <div className="col-md-6">
          <h5>A. Find your driver</h5>
          <p>Click the image that has your driver and click submit</p>
          <form onSubmit={submitDriver}>
            <div className="row no-gutters">
            {
              DRIVERS.map((driver, key) => (
                <div key={key} className="col-3">
                  <label className="pic-select-label check">
                    <img src={driver} className="img-fluid" alt="" />
                    <input type="radio" name="driver" value={key} required />
                    <span className="checkmark"></span>
                  </label>
                </div>
              ))
            }
              <div className="col-12 mt-3">
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
      <div className="my-3 d-flex align-items-center">
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
            <span>R</span><span>U</span><span>Y</span><span>O</span>
            &nbsp;&nbsp;&nbsp;
            <span>E</span><span>A</span><span>T</span></h1>
          <h1 className="scrambled-letters d-md-none">
            <span>R</span><span>E</span><span>S</span><span>H</span><span>A</span>
            <br />
            <span>R</span><span>U</span><span>Y</span><span>O</span>
            <br />
            <span>E</span><span>A</span><span>T</span></h1>
          <form onSubmit={submitUnscrambled}>
            <div className="row">
              <div className="col-12">
                <input type="text" name="unscrambled" className="form-control" placeholder="Type phrase here" required />
              </div>
              <div className="col-12 mt-3 text-center">
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
      <div className="my-3 d-flex align-items-center">
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
      <div className="my-3 d-flex align-items-center">
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
      <div className="my-3 d-flex align-items-center">
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
    <Layout>
      <div className="my-3 d-flex align-items-center">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Your ride is over but you can help us make sure future trips are better by leaving feedback after each trip.
        </h1>
      </div>

      <div className="row">
        <div className="col-12">
          <h5>Arrange these steps chronologically to leave feedback</h5>
          <p>We won't tell if you look at your app for these 😉</p>
          <div className="row">
            {
              SIXTH_OPTIONS.map((option, key) => (
                <button key={key} className="btn btn-secondary btn-full-width">
                  {key+1}. {option}
                </button>
              ))
            }
          </div>
            <form onSubmit={submitFeedbackOrder}>
              <div className="row feedbackOrder-row">
                  {
                    SIXTH_OPTIONS.map((option, key) => (
                      <input 
                        type="number"
                        ref={(ref) => sixthFormRefs[key] = ref} 
                        name={`feedbackOrder${key}`} 
                        className="form-control feedbackOrder-input" 
                        onChange={(e) => moveFeedbackCursor(key)} 
                        maxLength={1}
                        required
                      />
                    ))
                  }
                <div className="col-12">
                </div>
                <div className="col-12 mt-3">
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
      <div className="my-3 d-flex align-items-center">
        <h1 className="question-number">{questionNumber}</h1>
        <h1 className="question-text">
          Bolt trip Insurance in {geo.country} is called
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
              <div className="col-12 mt-3 text-center">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const PostQuestion = () => (
    <Layout>
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
    <Layout>
      <h1>Game Over!</h1>
      <div dangerouslySetInnerHTML={{ __html: message }}></div>
      <h5>
        Your score is {score}
      </h5>
      <p>
        Submit your name and social media handle to join the leaderboard and download your certificate
      </p>
      <form onSubmit={submitNameAndDownloadCertificate}>
        <div className="row">
          <div className="col-12 mb-3">
            <input type="text" name="name" className="form-control" placeholder="Your Name" required />
          </div>
          <div className="col-12 mb-3">
            <input type="text" name="handle" className="form-control" placeholder="Your Social Media Handle" required />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </Layout>
  )

  const ScoreSaved = () => (
    <Layout>
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
    <Layout>
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
      <div className="col-12 mt-3">
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
    
    case "FIRST-B":
      content = <FirstQuestionB />
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
      content = <Leaderboard limit={30} />
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
        <div className="text-center justify-content-center">
          {content}
        </div>
      </div>
    </>
  )
}
