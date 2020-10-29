import React from 'react'
import appStoreImg from "./app-store.png"
import playStoreImg from "./play-store.png"

export default function Footer() {
  return (
    <>
    <footer className="footer fixed-bottom">
      <div className="">
        {/* <h5 className="footertext font-weight-bold">#GratefulForEveryMile</h5> */}
      </div>
      <div className="footerbtns">
        <a href="https://apps.apple.com/pl/app/bolt/id675033630" className="text-right"><img width="100" src={appStoreImg} alt="Download on App Store" className="footerbtn1" /></a>
        <a href="https://play.google.com/store/apps/details?id=ee.mtakso.client&hl=en_GB" className="text-right"><img width="100" src={playStoreImg} alt="Download on Google Play" className="footerbtn2" /></a>
      </div>
    </footer>
    </>
  )
}