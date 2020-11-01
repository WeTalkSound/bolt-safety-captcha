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

export default function Home() {
  const [ geo,setGeo ] = useState({name: "Uche", hashtag: "NG"})
  const [ status,setStatus ] = useState("INITIAL")
  // const [ error,setError ] = useState("")
  const [ image,setImage ] = useState("")
  const [ car,setCar ] = useState(-1)
  const [ driver,setDriver ] = useState(-1)
  const [ unscrambled,setUnscrambled ] = useState("")
  const [ SOS,setSOS ] = useState([])
  const [ fourth, setFourth ] = useState(-1)
  const [ fifth, setFifth ] = useState(-1)
  const [ feedbackOrder, setFeedbackOrder ] = useState(-1)

  console.log(geo);
  console.log(car);

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

  const saveImage = () => {
    saveAs(image, `grateful-for-every-mile-${Date.now().toString(16)}.png`)
  }

  const submitDriver = (e) => {
    e.preventDefault()
    setDriver(e.target.driver.value)
    setStatus("SECOND")
  }

  const submitCar = (e) => {
    e.preventDefault()
    setCar(parseInt(e.target.car.value))
    setStatus("FIRST-B")
  }

  const submitUnscrambled = (e) => {
    e.preventDefault()
    let phrase = e.target.unscrambled.value
    setUnscrambled(phrase)
    setStatus("SOSQUESTION")
  }

  const submitSOS = (e) => {
    e.preventDefault()
    let selected = Array.from(e.target.sos).filter(el => el.checked).map(el => parseInt(el.value))
    setSOS(selected)
    setStatus("FOURTH")
  }

  const submitFourth = (answer) => {
    setFourth(answer)
    setStatus("FIFTH")
  }

  const submitFifth = (answer) => {
    setFifth(answer)
    setStatus("SIXTH")
  }

  const submitFeedbackOrder = (e) => {
    e.preventDefault()
    let phrase = e.target.feedbackOrder.value
    setFeedbackOrder(phrase)
    setStatus("SOSQUESTION")
  }

  const ANSWERS = {
    car: 3,
    driver: 6,
    unscrambled: "SHARE YOUR ETA",
    SOS: [0,1],
    fourth: 0,
    fifth: 4,
    feedbackOrder: [8,5,3,7,6,4,1,2]
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
    "Describe your issue",
    "Submit",
    "Select the trip(recent trip or another)",
    "Click on “Get help”",
    "Go to the support tab",
    "Scroll to the bottom",
    "Choose the problem topic",
    "Open your Bolt app"
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
        <div  className="col-12 animate__animated animate__flipInX">
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
        We believe that safety is in the lile things that happen <b>before</b>, < b>during</b> and <b>after</b> every ride.
      </p>
      <p>
        Can you prove that you’re a safety champ and can take
        advantage of all our safety features by solving as many
        CAPTCHAs as possible?
      </p>
      <button className="btn btn-primary" onClick={(e) => setStatus("FIRST")}>Get started</button>
    </Layout>
  )

  const FirstQuestion = () => (
    <Layout>
      <h1 className="question-number">1</h1> 
      <h1 className="question-text">
        Your ride is here!
      </h1>

      <div className="row">
        <div className="col-md-6">
          <img src={boltApp} className="img-fluid" alt="Your bolt ride" />
        </div>
        <div className="col-md-6">
          <h5>A. Find your driver's car</h5>
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
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const FirstQuestionB = () => (
    <Layout>
      <h1 className="question-number">1</h1> 
      <h1 className="question-text">
        Your ride is here!
      </h1>

      <div className="row">
        <div className="col-md-6">
          <img src={boltApp} className="img-fluid" alt="Your bolt ride" />
        </div>
        <div className="col-md-6">
          <h5>A. Find your driver</h5>
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
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const SecondQuestion = () => (
    <Layout>
      <h1 className="question-number">2</h1> 
      <h1 className="question-text">
        Your trip has begun.
      </h1>

      <div className="row text-left">
        <div className="col-12">
          <h5>Take your loved ones with you on your journey.</h5>
          <h5>Unscramble the letters to find out how:</h5>
          <h1 className="scrambled-letters"><span>R</span><span>E</span><span>S</span><span>H</span><span>A</span> <span>R</span><span>U</span><span>Y</span><span>O</span> <span>E</span><span>A</span><span>T</span></h1>
          <form onSubmit={submitUnscrambled}>
            <div className="row">
              <div className="col-12">
                <input type="text" name="unscrambled" className="form-control" placeholder="Type phrase here" required />
              </div>
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const SOSQuestion = () => (
    <Layout>
      <h1 className="question-number">3</h1> 
      <h1 className="question-text">
        You're on your way to your destination
      </h1>

      <div className="row">
        <div className="col-12">
          <h5>In which of these situations is it appropriate to use the Rider SOS button? (pick all that apply)</h5>
          <form onSubmit={submitSOS}>
            <div className="row">
            {
              SOS_OPTIONS.map((sos, key) => (
                <>
                {key < 3 && 
                <div key={key} className="col-4">
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
                <div key={key} className="col-4 offset-2">
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
                <div key={key} className="col-4">
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
      <h1 className="question-number">4</h1> 
      <h1 className="question-text">
        You’re on your way to your destination.
      </h1>

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
      <h1 className="question-number">5</h1> 
      <h1 className="question-text">
        You’re on your way to your destination.
      </h1>

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
      <h1 className="question-number">6</h1> 
      <h1 className="question-text">
        Your ride is over but you can help us make sure future trips are better by leaving feedback after each trip.
      </h1>

      <div className="row">
        <div className="col-12">
          <h5>Arrange these steps chronologically to leave feedback</h5>
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
              <div className="row">
                <div className="col-12">
                  <input type="text" name="feedbackOrder" className="form-control" placeholder="Insert order here separated by comma" required />
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
        </div>
      </div>
      
    </Layout>
  )

  const GratitudeDisplay = () => (
    <Layout>
      <h1>Share Your Image!</h1>
      <div className="col-12 mb-3 text-center">
        <img className="img-fluid" src={image} alt="Your Gratitude" />
      </div>
      <button className="btn btn-primary" onClick={saveImage}>Download</button>
      <button className="btn btn-primary" onClick={(e) => setStatus("IMAGE")}>Back</button>
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

    case "LOADED":
      content = <GratitudeDisplay />
      break;
    
    default:
      break;
  }

  return (
    <>
      <div className="col-12 justify-content-center">
        <div className="text-center justify-content-center">
          {content}
        </div>
      </div>
    </>
  )
}
