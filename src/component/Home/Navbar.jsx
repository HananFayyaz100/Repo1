import React, { useState } from "react";
import './app.css'
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open)
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="src/component/Home/firstj.png" alt="" />
        <span>A ali0324king@gmail.com</span>
      </div>
      <div className={`navbar-right ${open ? "open" : ""}`} >
        <a className="navhover" href="#service">Service</a>
        <a className="navhover" href="#portfolio">Portfolio</a>
        <a className="navhover" href="#skill">Skill</a>
        <a className="navhover" href="#contact">Contact</a>
        <a className="navhover" href="#resume">Resume</a>
        <button className="contact-btn">Contact Now at</button>
      </div>
      <div className="hm-burger" onClick={toggle}>☰</div>
    </nav>
  );
};

export default Navbar;
