import React from "react";
import "./Timeline.css";

const Timeline = () => {
  const experiences = [
    {
      year: "2024-2025 (Jun-Aug)",
      title: "Start Designing",
      company: "Pakistan Punjab Kamoke jini company",
    },
    {
      year: "2024-2025 (Sep-Dec)",
      title: "Practice Design",
      company: "Pakistan Punjab Kamoke master graphics company",
    },
    {
      year: "2024-2025 (Jan-Jul)",
      title: "Start Designing",
      company: "Pakistan Punjab Kamoke Eductor School",
    },
  ];

  const education = [
    {
      year: "2020-2022",
      title: "Matric Complete (Science)",
      company: "Pakistan Punjab Kamoke The Educator School",
    },
    {
      year: "2022-2024",
      title: "Inter Complete (ICS)",
      company: "Pakistan Punjab Kamoke Kips college",
    },
    {
      year: "2024-2025",
      title: "Different Designing Course",
      company: "Pakistan Punjab Kamoke, Gujranwala",
    },
  ];

  return (
    <div className="timeline-container">
      <div className="timeline-section">
        <h2 className="section-title"><div><img src="E:\Hanan Data\React js\AliBhai\Second\src\component\Timeline\edu.png" alt="" /></div>My Experience</h2>
        <div className="card-grid">
          {experiences.map((item, index) => (
            <div key={index} className="card">
              <h3 className="year">{item.year}</h3>
              <h4 className="title">{item.title}</h4>
              <p className="company">{item.company}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-section">
        <h2 className="section-title">My Education</h2>
        <div className="card-grid">
          {education.map((item, index) => (
            <div key={index} className="card">
              <h3 className="year">{item.year}</h3>
              <h4 className="title">{item.title}</h4>
              <p className="company">{item.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
