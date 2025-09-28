import React, { useState } from "react";
import "./ClientStories.css";
const cards = [
  {
    company: "》COSMIC SPORTS",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    text:
      "Taylor is a professional Designer he really helps my business by providing value to my business",
    author: "Brandon Fraser",
    job: "Senior Software Dev, Cosmic Sport",
  },
  {
    company: "✫ COMPANY",
    img: "src/component/ClientStories/images1.jpg",
    text:
      "Taylor is a professional Designer he really helps my business by providing value to my business",
    author: "Brandon Fraser",
    job: "SEO Specialist, Germany",
  },
  {
    company: "❅ Mika Paul",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text:
      "Taylor completed the project on time and delivered the best work, highly recommended.",
    author: "Loren Mikue",
    job: "Best Time and Best Work",
  },
];

const clientList = [
  { name: "Tim Bailey", note: "SEO Specialist, Theme Junction" },
  { name: "Brandon Fraser", note: "Best quality work" },
  { name: "Loren Mikue", note: "Best Time and best work" },
];

export default function ClientStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate translateX value
  // Since two cards visible, move by card width (50%) on each step
  const translateXPercent = -(activeIndex * 50);

  return (
    <section className="client-stories-section">
   
      <div className="client-stories-left">
      <div className="spot_line"></div>
        <h2 className="client-title">My Client's Stories</h2>
        <p className="client-desc">
          Empowering people in new a digital journey
          <br />
          with my super services
        </p>
        <span className="client-list">
          {clientList.map((client, i) => (
            <li key={i}>
              <div className="client-name">{client.name}</div>{" "}
              <br />
              <div className="client-note">({client.note})</div>
            </li>
          ))}
        </span>
      </div>

   

      <div className="client-stories-right">
        <div className="testimonial-slider-container">
          <div
            className="testimonial-slider"
            style={{ transform: `translateX(${translateXPercent}%)` }}
          >
            {cards.map((card, idx) => (
              <div className="testimonial-card" key={idx}>
           

               <div className="img-main">
                  <img
                    className="testimonial-img"
                    src={card.img}
                    alt={`${card.author} profile`}
                  />

               </div>
                <div className="testimonial-header">
                  <span className="testimonial-company">{card.company}</span>
                </div>
                  <div className="boss">

                  <img className="ho" src="src/component/ClientStories/vector.png" alt="" />
                  <img className="hi" src="src/component/ClientStories/vector.png" alt="" />
                  </div>
                  

                  
                <div className="testimonial-text">"{card.text}"</div>
                <div className="testimonial-author">
                  <span className="testimonial-name">{card.author}</span>
                  <span className="testimonial-role">{card.job}</span>
                </div>
               
              </div>
            ))}
          </div>
        </div>

        <div className="slider-dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`dot ${activeIndex === i ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
     
    </section>
  );
}
