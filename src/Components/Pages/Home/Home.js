import React, { useState, useLayoutEffect } from 'react'
import { saveAs } from 'file-saver';
import Button from '../../Utilities/Button/Button'
import bolt_logo from './bolt_logo_light.png'
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

export default function Home() {
  const [ geo,setGeo ] = useState({name: "Uche", hashtag: "NG"})
  const [ status,setStatus ] = useState("INITIAL")
  const [ error,setError ] = useState("")
  const [ image,setImage ] = useState("")
  const [ car,setCar ] = useState(-1)
  const [ file,setFile ] = useState(new Blob())
  const [ gratitude,setGratitude ] = useState("")

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

  const submit = () => {
    console.log("File triggered")
    if (!gratitude.length) {
      setError("Please select something you're grateful for.")
      return
    }
    if (!file) {
      setError("Please upload an image.")
      return
    }
    setStatus("UPLOADING")
    const formData = new FormData()

    formData.append("image", file)

    console.log(formData, formData.toString())

    let [category, quoteIndex] = gratitude.split('&')

    fetch(`https://services.etin.space/bolt-campaign/api/gratitude/?gratefulFor=${category}&quoteIndex=${quoteIndex}`, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        return res.blob()
      })
      .then(images => {

        let image = new Image()

        let imageUrl = (URL.createObjectURL(images))
        image.src = imageUrl

        image.onload = () => {
          let canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height

          canvas.getContext('2d').fillRect(0, 0, image.width, image.height)
          canvas.getContext('2d').drawImage(image, 0, 0)

          let icon = new Image()
          // icon.src = "http://services.etin.space/bolt-campaign/api/gratitude/logo.php"
          icon.src = bolt_logo
          // icon.crossOrigin = "anonymous"

          icon.onload = () => {
            let 
              iconCanvas = document.createElement('canvas'), 
              max_size = image.width > image.height ?  image.width * 0.1 : image.height * 0.1,
              width = icon.width,
              height = icon.height

            if (width > max_size) {
              height *= max_size / width
              width = max_size
            }

            console.log(image.width, image.height, image.width * image.height, max_size)
            
            iconCanvas.width = width
            iconCanvas.height = height
            iconCanvas.getContext('2d').drawImage(icon, 0, 0, width, height)

            canvas.getContext('2d').drawImage(iconCanvas, image.width/20, image.height - (image.height/10))
            
            canvas.toBlob(blob => {
              console.log("To Blob")
              console.log(blob)
              setImage(URL.createObjectURL(blob))
              setStatus("LOADED")
            })
          }

        }
      })
  }

  useLayoutEffect(submit, [file])

  const onUpload = e => {
    const file = Array.from(e.target.files)[0]

    console.log(file.type.match(/image.*/))

    if( file.type.match(/image.*/) ) {
      let reader = new FileReader()
      reader.onload = readerEvent => {
        let image = new Image()
        image.onload = imageEvent => {
          let 
            canvas = document.createElement('canvas'), 
            max_size = 1024,
            width = image.width,
            height = image.height
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width
              width = max_size
            }
          }
          else {
            if (height > max_size) {
              width *= max_size / height
              height = max_size
            }
          }
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d').drawImage(image, 0, 0, width, height)

          canvas.toBlob(blob => {
            setImage(URL.createObjectURL(blob))
            // setStatus("CROP")
            setFile(blob)
          })
        }
        image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    }
    else {
      setError("Please upload an image.")
      console.log(error)
      return
    }
  }

  const btnChecked = (e) => {
    if(e.target.checked) {
      let category = e.target.name
      // setGratitude(`${category}&${Math.floor(Math.random() * GratitudeQuotes[category].length)}`)
      setStatus("IMAGE")
    }
  }

  const saveImage = () => {
    saveAs(image, `grateful-for-every-mile-${Date.now().toString(16)}.png`)
  }

  const submitDriver = (e) => {
    e.preventDefault()
    setCar(e.target.car.value)
    setStatus("SECOND")
  }

  const submitCar = (e) => {
    e.preventDefault()
    setCar(parseInt(e.target.car.value))
    setStatus("FIRST-B")
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
              DRIVERS.map((car, key) => (
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

  const SecondQuestion = () => (
    <Layout>
      <h1 className="question-number">2</h1> 
      <h1 className="question-text">
        Your trip has begun.
      </h1>

      <div className="row">
        <div className="col-12">
          <h5>Take your loved ones with you on your journey.</h5>
          <h5>Unscramble the letters to find out how:</h5>
          <form onSubmit={submitCar}>
            <div className="row">
              <div className="col-12">
                <input type="text" name="unscramble" placeholder="Type phrase here" required />
              </div>
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  )

  const GratitudeImageUpload = () => {
    let [category, quoteIndex] = gratitude.split('&')
    return (
    <Layout middle>
      <h1>
        You are <br/>
        {/* <span className="primary-text font-weight-bold">"{GratitudeQuotes[category][quoteIndex].replace('Uche', geo.name)}"</span> */}
      </h1>
      <p>
        Upload a picture to download your result. <br/>
        Share on your social media page for the chance to win a brand new iPhone 11
      </p>
      <div className="col-12 mb-3 text-center">
        {/* <img className="img-fluid" src={image} alt="Your Gratitude" /> */}
        <Button type="primary" >
          <label className="m-0" htmlFor='single-image'>
            UPLOAD IMAGE
          </label>
        </Button>
        <input style={{display: "none", opacity: 0}} type='file' id='single-image' onChange={onUpload} /> 
        <button className="btn btn-primary" onClick={(e) => setStatus("START")}>Back</button>
      </div>
    </Layout>
    )
  }

  const GratitudeImageCrop = () => (
    <Layout>
      <div className="crop-container">
        {/* <Cropper
          image={image}
          crop={crop}
          // zoom={1}
          aspect={1}
          // restrictPosition={true}
          // zoomWithScroll={false}
          // onCropChange={setCrop}
          onCropChange={cropSetter}
          // onMediaLoaded={(x) => { setCropSetter(setCrop) }}
          // onCropComplete={onCropComplete}
          // onZoomChange={onZoomChange}
        /> */}
      </div>
      <div className="col-12 mb-3 text-center">
        {/* <button className="btn btn-primary" onClick={ showCroppedImage }>Crop</button> */}
        <button className="btn btn-primary" onClick={(e) => setStatus("SLIDER")}>Back</button>
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
    
    case "IMAGE":
      content = <GratitudeImageUpload />
      break;
    
    case "CROP":
      content = <GratitudeImageCrop />
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
