import React from 'react'
import './footer.css';
import first from './firstj.png'
function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className='first-part'>
          <img src={first} alt="" />
        </div>
        <div className="second-part">
          <span>Service</span>
          <span>Portfolio</span>
          <span>Contact</span>
          <span>Resume</span>
          <span>Skill</span>
          <span>Project</span>
          <span>Education</span>
          
        </div>
        <div className='third-part'>ali0324king@gmail.com.best.service</div>
      </div>
    </div>
  )
}

export default Footer
