import React, { useState, useLayoutEffect } from 'react'
import { saveAs } from 'file-saver';
import Button from '../../Utilities/Button/Button'
import bolt_logo from './bolt_logo_light.png'

export default function Home() {
  const [ geo,setGeo ] = useState({name: "Uche", hashtag: "NG"})
  const [ status,setStatus ] = useState("INITIAL")
  const [ error,setError ] = useState("")
  const [ image,setImage ] = useState("")
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
      setGratitude(`${category}&${Math.floor(Math.random() * GratitudeQuotes[category].length)}`)
      setStatus("IMAGE")
    }
  }

  const saveImage = () => {
    saveAs(image, `grateful-for-every-mile-${Date.now().toString(16)}.png`)
  }

  const GratitudeQuotes = {
      "Life": [
          "Thankful to Not have COVID",
          "Thankful to Be alive",
          "Thankful for The gift of a new day",
          "Thankful for Birthdays",
          "Grateful to Not have to go to the clinic",
          "Grateful for Paid healthcare",
          "Thankful for Healthcare Workers",
          "Thankful for Home Workouts",
          "Thankful for Face Masks",
          "Grateful for The Chance To Slow Down",
          "Grateful for Early Morning Walks",
          "Grateful for A Safe Home",
          "Thankful for Life and Hope",
          "Grateful for Good Weather",
          "Thankful for Health",
          "Grateful for Reasons to Smile",
          "Grateful for Restful Sleep" 
      ],
      "Funds": [
          "Thankful that I can take care of family",
          "Happy that I can afford my cravings",
          "Happy that I can sponsor my lifestyle",
          "Grateful that I can help people in need",
          "Thankful that Santorini is in my future",
          "Thankful for The stamps in my passport",
          "Grateful to Have Money Saved Up",
          "Grateful that My Money Grows Like grass",
          "Thankful that The Grass Is Green On My Side",
          "Grateful that Money Stops Nonsense",
          "Grateful for Fat Wallets",
          "Grateful to Not Have To Look At The Price Tag",
          "Grateful to Be Able To Spend and Save",
          "Grateful for Debit Cards That Work Like Black Cards",
          "Thankful for Online Giveaways"
      ],
      "Family": [
          "Grateful for My Support System",
          "Grateful that I'm My Best Friend’s Best Friend!",
          "Happy that I Can Text My Friend At Midnight With Gossip",
          "Thankful for A Roof Over My Head",
          "Happy for Gossip Partners",
          "Happy that My Friends Are No Longer Choosing Toxic People",
          "Grateful for Selfie Partners",
          "Thankful for Great Memories",
          "Grateful for The Absence of Entanglements",
          "Thankful to Have People To Say “I love you” To",
          "Grateful for The Family I Got To Choose",
          "Grateful for Day One’s and the New One’s",
          "Thankful for People To Lean On",
          "Thankful for Family Bonding Time",
          "Thankful for Supportive Friends",
          "Grateful for the phone calls that end with “I love you”",
          "Grateful for friendly banter",
          "Grateful to be a listening ear to my friends and family",
          "Happy that I can wake up to leftover meals",
          "Grateful for people to listen to my rants",
          "Thankful for breakfast in bed",
          "Grateful for my crew",
          "Grateful for friends that mind my business",
          "Grateful to have someone to share my life with",
          "Grateful for friends that tell me the truth",
          "Thankful for family that check in on me",
          "Thankful for laughter"
      ],
      "Career": [
          "Grateful that I can do giveaways",
          "Thankful for having a fighting spirit",
          "Thankful for having a reason to get up in the mornings",
          "Grateful to be an employer of labour",
          "Thankful to still have my business",
          "Grateful for promotions",
          "Thankful for new opportunities",
          "Thankful for end of month credit alerts",
          "Grateful for credit alerts",
          "Grateful for daily safe travels",
          "Thankful for Fridays at the end of a hectic week",
          "Grateful to be able to hear “How was your weekend?”",
          "Grateful to be able to hand out business cards",
          "Grateful for good colleagues",
          "Thankful for competition that pushes me to be better",
          "Happy to be able to pay my bills",
          "Thankful that my bills and income are in the same weight class",
          "Thankful to be booked and busy",
          "Grateful for remote work",
          "Grateful for people who believe in me",
          "Thankful for career mentors"
      ],
      "Growth": [
          "Grateful that I have a degree",
          "Grateful for online classes",
          "Thankful for new skill sets",
          "Grateful for hobbies that turn into income",
          "Grateful for self-help resources",
          "Grateful to have started something new",
          "Thankful for new opportunities ",
          "Thankful for communities that push you to be better",
          "Grateful that learning is never wasted",
          "Thankful for experiences that teach",
          "Thankful for resolutions that stick",
          "Grateful for the teachers in my life",
          "Grateful for mentors",
          "Thankful for study groups",
          "Grateful for new learnings"
      ],
      "Uche": [
          "Thankful that Uche stays consistent",
          "Thankful for the promo codes from Uche",
          "Thankful for at least one person who respects text, don’t call",
          "Grateful for emails from Uche",
          "Thankful that Uche from Bolt never forgets me",
          "Grateful for affordable rides",
          "Grateful that Uche saves me money",
          "Thankful for future promo codes",
          "Thankful for five star drivers",
          "Thankful for drivers that pass the aux",
          "Grateful to be able to share my journeys with friends",
          "Grateful for rides that are tracked",
          "Thankful that Uche respects text, don’t call"
      ],
      "Good": [
          "Grateful that I don’t need designer to look designer",
          "Grateful for glowing skin",
          "Thankful that I’m comfortable in my own skin",
          "Grateful for looks that cannot be masked",
          "Grateful for good looks",
          "Grateful to be securing myself, because I’m the bag",
          "Grateful for my drip",
          "Grateful for more time to show off my style",
          "Thankful that I slay with my looks",
          "Excited to not need these filters",
          "Grateful for filters",
          "Thankful that “I woke up like this!”",
          "Grateful for looks that turn heads",
          "Grateful for a body that doesn’t quit",
          "Grateful for my six pack",
          "Thankful for eye brows on fleek"
      ],
    };

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
            <img src="https://placehold.it/500x500" className="img-fluid img-round landing-img" alt="" />
            <div className="landing-text">
              <span className="landing-label">Verified</span>
              <h1 className="landing-h1 font-weight-bold">BEFORE</h1>
            </div>
          </div>
        </div>
        <div className="col-4 landing-col">
          <div>
            <img src="https://placehold.it/500x500" className="img-fluid img-round landing-img" alt="" />
            <div className="landing-text">
              <span className="landing-label">Secure</span>
              <h1 className="landing-h1 font-weight-bold">DURING</h1>
            </div>
          </div>
        </div>
        <div className="col-4 landing-col">
          <div>
            <img src="https://placehold.it/500x500" className="img-fluid img-round landing-img" alt="" />
            <div className="">
              <span className="landing-label">Support</span>
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
      {/* <h1 className="font-weight-bold">
        Tell us what you're most grateful for 
        to unlock your Gratitude poster
      </h1>
      <div className="form-group">
        
        <label className="checkbtn bg-primary-light">Life &amp; Health
          <input type="checkbox" name="Life" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn bg-primary-light">Funds
          <input type="checkbox" name="Funds" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn bg-primary-light">Family &amp; Friends
          <input type="checkbox" name="Family" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="form-group">
        <label className="checkbtn">Career
          <input type="checkbox" name="Career" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">Growth
          <input type="checkbox" name="Growth" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">{geo.name} from Bolt
          <input type="checkbox" name="Uche" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">Good Looks
          <input type="checkbox" name="Good" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
      </div>
     */}
    </Layout>
  )

  const FirstQuestion = () => (
    <Layout>
      <h1 className="question-number">1</h1>
      <h1>Your ride is here!</h1>
      <div className="form-group">
        <input type="range" step="1" min="0" defaultValue="0" max="10" className="custom-range" id="formControlRange" />
        <div className="row range-indicators">
          <div style={{textAlign:"left"}} className="col">0</div>
          <div className="col">1</div>
          <div className="col">2</div>
          <div className="col">3</div>
          <div className="col">4</div>
          <div className="col">5</div>
          <div className="col">6</div>
          <div className="col">7</div>
          <div className="col">8</div>
          <div className="col">9</div>
          <div style={{textAlign:"right"}} className="col">10</div>
        </div>
        <button className="btn btn-primary" onClick={(e) => setStatus("IMAGE")}>Let's Go!</button>
        <button className="btn btn-primary" onClick={(e) => setStatus("INITIAL")}>Back</button>
      </div>
    </Layout>
  )

  const GratitudeImageUpload = () => {
    let [category, quoteIndex] = gratitude.split('&')
    return (
    <Layout middle>
      <h1>
        You are <br/>
        <span className="primary-text font-weight-bold">"{GratitudeQuotes[category][quoteIndex].replace('Uche', geo.name)}"</span>
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
