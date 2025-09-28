import React, { useState } from 'react'
import './Home2.css'
import ali from './ali.jpeg';
import icon from './firstj.png'
import { Link, Element } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
function Home2() {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(!open);
    }
    return (
        <div>
            <div className='first-upper'>
                <div className='spot'></div>
                <div className='spot2'></div>
                <div className='navbar'>
                    <div className='navimgbox'>
                        <img src={icon} alt="" />
                        <span>ali0324king@gmail.com</span>
                    </div>
                    <div className={`rightnav ${open ? "on" : ""}`}>
                        <span> <Link to='service' smooth={true} duration={300}>Services</Link></span>
                        <span><Link to='port' smooth={true} duration={500}>Portfolio</Link></span>
                        <span><Link to='skill' smooth={true} duration={600}>Skills</Link></span>
                        <span><Link to='contact' smooth={true} duration={700}>Contact</Link></span>
                        <span><Link to='resume' smooth={true} duration={800}>Resume</Link></span>
                        <button className='navbuttona btncontact'><Link to='contact' smooth={true} duration={700}>Contact Now</Link></button>
                    </div>
                    <div className='burger' onClick={toggleMenu}>&#9776;</div>
                </div>
                <div className='hero-section'>
                    <div data-aos="fade-left" className='hero-content'>
                        <div className='first-section-of-content'>
                            <span className='name'>I am Ali Fayyaz</span>
                        </div>
                        <div className='second short1'>
                            <span>UI/UX, Graphicspan </span> <br /> <span> Designer& Frontend </span> <br /> <span> Developer</span>
                        </div>
                        <div className='third'>
                            <span>With a focus on front-end development using HTML,
                                CSS,  and JavaScript, my area of expertise is full-stack
                                design and Front-end web  development. In addition, I
                                know how to use WordPress and Shopify well  and can
                                integrate a lot of different tools  and platforms to
                                create creative digital solutions. </span>
                        </div>
                        <div className='fourth'>
                            <button><Link to='service'>Read more</Link></button>
                            <button>   <a href="https://www.facebook.com/@ali.fayyaz. 163891"   target="_blank" rel="noopener noreferrer"><FontAwesomeIcon color='white' icon={faFacebook} size={20} /></a></button>
                            <button><a href="https://www.instagram.com/myusername"   target="_blank" rel="noopener noreferrer"><FontAwesomeIcon color="white" icon={faInstagram} size='5px' /></a></button>
                            <button><a href="https://wa.me/923246233787?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20services!"   target="_blank" rel="noopener noreferrer"><FontAwesomeIcon color="white" icon={faWhatsapp} size='10px' /></a></button>
                        </div>
                    </div>
                    <div className='right-hero-img'>
                        <img src={ali} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home2
