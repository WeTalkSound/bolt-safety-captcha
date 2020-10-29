import React from 'react'
import longRoad from './longRoad.png'
import selfProtector from './selfProtector.png'
import familyProtector from './familyProtector.png'
import communityProtector from './communityProtector.png'
import ultimateProtector from './ultimateProtector.png'
import SocialShare from '../../Utilities/SocialShare/SocialShare'
import Button from '../../Utilities/Button/Button'

export default function Results({ grade, certificate }) {
  let icon = {}
  let title = ""
  let description = "Yo! Stuff"

  switch (grade) {
    case "The “long road to becoming” a Protector":
      icon = longRoad
      title = `You're on <span className="primary-text">${grade}</span>`
      description = `
                      <p>You have some work to do to set you on the path to being a protector.</p> 
                      <p>Deep down, you care about doing the right thing but you may not have the tools yet.</p>
                      <p>
                        There are a lot of credible resources available online to help you, such as 
                        <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">here</a>. 
                      </p>
                      <p>We’re rooting for you as you embark on your journey to becoming.</p>
                    `
      break;
    case "The Self Protector":
      icon = selfProtector
      title = `You're <span className="primary-text">${grade}</span>`
      description = `
                      <p>You’re a big believer that ‘charity begins within.’</p>
                      <p>
                        You do everything it takes to keep safe knowing that your individual effort 
                        will contribute to the greater good. 
                      <p>
                        By taking the steps to keep yourself safe,
                        you are creating a ripple effect that we are all grateful for.
                      </p>
                    `
      break;
    case "The Family Protector":
      icon = familyProtector
      title = `You're <span className="primary-text">${grade}</span>`
      description = `
                      <p>All you need in this life is you and your family.</p>
                      <p>
                        Whether it’s the family you were born into or the one you’ve chosen, you’re always 
                        on guard to make sure they’re properly protected. 
                      </p>
                      <p>
                        We’re in awe of your devotion 
                        to the ones you love.
                      </p>
                    `
      break;
    case "The Community Protector":
      icon = communityProtector
      title = `You're <span className="primary-text">${grade}</span>`
      description = `
                      <p>To you, the community is just one big family.</p>
                      <p>
                        You understand that looking out for the community is vital to winning the war 
                        against COVID-19.
                      </p>
                      <p>
                        You are devoted to limiting the spread, not just of the virus 
                        but of unverified information.
                      </p>
                      <p> 
                        You practice all the recommended health guidelines 
                        and are not afraid to be the evangelist the community needs to keep everyone safe. 
                      </p>
                      <p>Accept our salutations.</p>
                    `
      break;
    case "The Ultimate Protector":
      icon = ultimateProtector
      title = `You're <span className="primary-text">${grade}</span>`
      description = `
                      <p>You are the war and the fight.</p>
                      <p>Coronavirus has no chance around you, your loved ones or your community.</p>
                      <p>
                        You are the biggest fact checker, never to leave a man uneducated about the virus.
                        You can’t wait to flatten the curve.
                      </p>
                      <p>
                        With masked faces and the appropriate social distance, 
                        we tip our hats for you.
                      </p>
                    `
      break;
  
    default:
      break;
  }
  return (
    <>
      <h3 className="text-center" dangerouslySetInnerHTML={{__html: title}}></h3>
      <div className="row align-items-md-center">
        <div className="col-sm-12 mb-3 col-md-6">
          <img
              className="img-fluid"
              src={icon}
              alt={grade}
              style={{
                  maxHeight: "350px",
                  margin: "0 auto",
                  display: "block"
              }}
          />
        </div>
        <div className="col-sm-12 mb-3 col-md-6">
            <div style={{textAlign:"left"}} dangerouslySetInnerHTML={{__html: description}}></div>
            <Button href={certificate}>Get Certificate</Button>
        </div>
        <h3 className="col-12 text-center">Share this quiz!</h3>
        <SocialShare
          text={"I got " + grade + ". Take the Bolt Protect Quiz to gauge your protector level."} 
          url="https://smarterwithbolt.com" 
          tag={"#SaferSmarterChoices"} 
        />
      </div>
    </>
  )
}