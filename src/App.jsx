// import { useEffect, useState } from 'react'
// import AOS from "aos";           
// import "aos/dist/aos.css"; 
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Hero from './component/Home/Hero'
// import Navbar from './component/Home/Navbar'
// import QualityServices from './component/Quality/QualityServices'
// import Portfolio from './component/Portfolio/Portfolio'
// import Timeline from './component/Timeline/Timeline'
// import ClientStories from './component/ClientStories/ClientStories'
// import Contact from './component/Contact/Contact'
// import Home2 from './component/SecondHome/Home2'
// import SecondService from './component/SecondService/SecondService'
// import Skills from './component/MySkills/Skills'
// import Footer from './component/Footer/Footer'
// import Scroll from './component/Scroll/Scroll';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// import { faHome } from "@fortawesome/free-solid-svg-icons";

// function App() {
//   useEffect(() => {
//     AOS.init({ duration: 600, delay: 200});
//   }, [])

//   return (
//     <>

//     <section data-aos="fade-up" data-aos-duration="400">
//       <Home2/>
//     </section>
//     <section data-aos="flip-left" id='service'>

//       <SecondService />
//     </section>

//     <section id='port'>
//       <Portfolio />
//     </section>
//       <section data-aos="fade-up">
//         <ClientStories />
//       </section>
//     <section data-aos="fade-up" id='resume'>
//       <Timeline />
//     </section>

    
//     <section data-aos="fade-up" id='skill'>
//       <Skills />
//     </section>

//     <section id='contact'>
//       <Contact />
//     </section>

    
  
  
//     <Footer />
//     <Scroll />
//     </>
//   )
// }

// export default App




// import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

// import AOS from "aos";
// import "aos/dist/aos.css";
// import "./App.css";

// import Home2 from "./component/SecondHome/Home2";
// import SecondService from "./component/SecondService/SecondService";
// import Portfolio from "./component/Portfolio/Portfolio";
// import ClientStories from "./component/ClientStories/ClientStories";
// import Timeline from "./component/Timeline/Timeline";
// import Skills from "./component/MySkills/Skills";
// import Contact from "./component/Contact/Contact";
// import Footer from "./component/Footer/Footer";
// import Scroll from "./component/Scroll/Scroll";

// import AdminLogin from "./pages/Admin/AdminLogin";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import AddProject from "./pages/Admin/AddProjects";
// import AdminProjects from "./pages/Admin/AdminProjects";
// import ProtectedRoute from "./pages/Admin/ProtectedRoute";

// function PublicWebsite() {
//   return (
//     <>
//       <section
//         data-aos="fade-up"
//         data-aos-duration="400"
//       >
//         <Home2 />
//       </section>

//       <section
//         data-aos="flip-left"
//         id="service"
//       >
//         <SecondService />
//       </section>

//       <section id="port">
//         <Portfolio />
//       </section>

//       <section data-aos="fade-up">
//         <ClientStories />
//       </section>

//       <section
//         data-aos="fade-up"
//         id="resume"
//       >
//         <Timeline />
//       </section>

//       <section
//         data-aos="fade-up"
//         id="skill"
//       >
//         <Skills />
//       </section>

//       <section id="contact">
//         <Contact />
//       </section>

//       <Footer />

//       <Scroll />
//     </>
//   );
// }

// function App() {
//   useEffect(() => {
//     AOS.init({
//       duration: 600,
//       delay: 200,
//     });
//   }, []);

//   return (
//     <Routes>
//       {/* Public Website */}
//       <Route
//         path="/"
//         element={<PublicWebsite />}
//       />

//       {/* Admin Login */}
//       <Route
//         path="/admin/login"
//         element={<AdminLogin />}
//       />

//       {/* Protected Admin Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route
//           path="/admin/dashboard"
//           element={<AdminDashboard />}
//         />

//         <Route
//           path="/admin/add-project"
//           element={<AddProject />}
//         />
//         <Route
//   path="/admin/projects"
//   element={<AdminProjects />}
// />
//       </Route>
//     </Routes>
//   );
// }

// export default App;




import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProject from "./pages/Admin/AddProjects";
import AdminProjects from "./pages/Admin/AdminProjects";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";

// Public components
import Home2 from "./component/SecondHome/Home2";
import SecondService from "./component/SecondService/SecondService";
import Portfolio from "./component/Portfolio/Portfolio";
import ClientStories from "./component/ClientStories/ClientStories";
import Timeline from "./component/Timeline/Timeline";
import Skills from "./component/MySkills/Skills";
import Contact from "./component/Contact/Contact";
import Footer from "./component/Footer/Footer";
import Scroll from "./component/Scroll/Scroll";
import AnimatedBackground from "./component/AnimatedBackground/AnimatedBackground";
import ForgotPassword from "./pages/Admin/ForgotPassword";
import ResetPassword from "./pages/Admin/ResetPassword";


function PublicWebsite() {
  return (
    <>
      <AnimatedBackground />

      <div className="website-content">

        <section
          data-aos="fade-up"
          data-aos-duration="400"
        >
          <Home2 />
        </section>

        <section
          data-aos="flip-left"
          id="service"
        >
          <SecondService />
        </section>

        <section id="port">
          <Portfolio />
        </section>

        <section data-aos="fade-up">
          <ClientStories />
        </section>

        <section
          data-aos="fade-up"
          id="resume"
        >
          <Timeline />
        </section>

        <section
          data-aos="fade-up"
          id="skill"
        >
          <Skills />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />

        <Scroll />

      </div>
    </>
  );
}


function App() {

  useEffect(() => {
    AOS.init({
      duration: 600,
      delay: 200,
    });
  }, []);

  return (
    <Routes>

      {/* =========================
          PUBLIC WEBSITE
      ========================== */}

      <Route
        path="/"
        element={<PublicWebsite />}
      />


      {/* =========================
          ADMIN LOGIN
      ========================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =========================
          PROTECTED ADMIN ROUTES
      ========================== */}

      <Route element={<ProtectedRoute />}>

        {/* Dashboard */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />


        {/* Add Project */}

        <Route
          path="/admin/add-project"
          element={<AddProject />}
        />


        {/* Manage Projects */}

        <Route
          path="/admin/projects"
          element={<AdminProjects />}
        />

      </Route>
        <Route
  path="/admin/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/admin/reset-password/:token"
  element={<ResetPassword />}
/>

    </Routes>
  );
}

export default App;