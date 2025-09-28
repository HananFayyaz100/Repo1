import React from "react";
 // add your image inside src folder
import './app.css'
const Hero = () => {
  return (
    <section className="hero">
      <span className="text-puls">Ali Fayyaz</span>
      <div className="hero-text">
        <h4>I'm Ali Fayyaz</h4>
        <h1>UI/UX, Graphic Designer, Web developer</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          distinctio corporis alias officiis dolores explicabo, autem provident
          doloremque libero incidunt praesentium nobis atque obcaecati placeat
          sint ex dignissimos id fugiat, modi dolorum sit optio ab quasi
          molestias?
        </p>
        <div className="hero-buttons">
          <button>Download CV</button>
          <button>Ins</button>
          <button>Facebook</button>
          <button>Wattssap</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="" alt="profile" />
      </div>
    </section>
  );
};

export default Hero;
