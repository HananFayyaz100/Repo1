import { useEffect, useState } from 'react'
import AOS from "aos";           
import "aos/dist/aos.css"; 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './component/Home/Hero'
import Navbar from './component/Home/Navbar'
import QualityServices from './component/Quality/QualityServices'
import Portfolio from './component/Portfolio/Portfolio'
import Timeline from './component/Timeline/Timeline'
import ClientStories from './component/ClientStories/ClientStories'
import Contact from './component/Contact/Contact'
import Home2 from './component/SecondHome/Home2'
import SecondService from './component/SecondService/SecondService'
import Skills from './component/MySkills/Skills'
import Footer from './component/Footer/Footer'
import Scroll from './component/Scroll/Scroll';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function App() {
  useEffect(() => {
    AOS.init({ duration: 600, delay: 200});
  }, [])

  return (
    <>

    <section data-aos="fade-up" data-aos-duration="400">
      <Home2/>
    </section>
    <section data-aos="flip-left" id='service'>

      <SecondService />
    </section>

    <section id='port'>
      <Portfolio />
    </section>
      <section data-aos="fade-up">
        <ClientStories />
      </section>
    <section data-aos="fade-up" id='resume'>
      <Timeline />
    </section>

    
    <section data-aos="fade-up" id='skill'>
      <Skills />
    </section>

    <section id='contact'>
      <Contact />
    </section>

    
  
  
    <Footer />
    <Scroll />
    </>
  )
}

export default App
