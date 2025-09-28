import React from 'react';
import './QualityServices.css';

const services = [
  {
    number: "01",
    title: "UI/UX Design",
    description: "Unlock the potential of seamless digital experiences with our bespoke UI/UX designs, meticulously crafted to engage users and elevate your brand.",
    icon: "↘",
    highlight: false,
  },
  {
    number: "02",
    title: "Web Development",
    description: "I specialize in building interactive, responsive, and scalable websites. Whether you're a startup or an established business, I bring modern web development.",
    icon: "↘",
    highlight: false,
  },
  {
    number: "03",
    title: "Graphic Design",
    description: "I'm a passionate graphic designer with a strong eye for detail and creativity. I specialize in creating visually appealing designs and leave a lasting impression.",
    icon: "↗",
    highlight: true,
  },
  {
    number: "04",
    title: "Video Editing",
    description: "I’m a creative video editor with a passion for storytelling through visuals. I specialize in transforming raw engaging, high-quality connect with audiences.",
    icon: "↘",
    highlight: false,
  },
];

const QualityServices = () => {
  return (
    <section className="services-section">
      <h2 className="services-title">My Quality Services</h2>
      <p className="services-subtitle">
        Transforming Ideas into Digital Masterpieces: Elevating Experiences Through Graphic and UI/UX Design.
      </p>
      <div className="services-list">
        {services.map((service, idx) => (
          <div
            key={service.number}
            className={`service-item${service.highlight ? ' highlight' : ''}`}
          >
            <div className="service-number">{service.number}</div>
            <div>
              <span className="service-title">{service.title}</span>
              <span className="service-description">{service.description}</span>
            </div>
            <div className="service-arrow"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualityServices;
