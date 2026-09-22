import React from 'react'
import './contact.css'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
function Contact() {
    const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    // ✅ Validation rules
    if (name.split(" ").length < 0) {
      Swal.fire({
        title: "Invalid Name",
        text: "Your name must be at least 5 words.",
        icon: "error",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      return;
    }

    if (message.split(" ").length < 4) {
      Swal.fire({
        title: "Message Too Short",
        text: "Your message must contain at least 4 words.",
        icon: "error",
      });
      return;
    }

    // ✅ Web3Forms authentication
    formData.append("access_key", "e189e6d4-3a96-4aa5-8b7f-f59c27b80379");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        Swal.fire({
          title: "Successfully",
          text: "Your information is submitted",
          icon: "success",
        });
        event.target.reset(); // ✅ Clear fields after success
      } else {
        Swal.fire({
          title: "Error",
          text: res.message || "Something went wrong",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to submit. Please try again.",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <div className='contact'>
        <div data-aos="fade-right" className='left-contact'>
          <span>Let's work together</span>
          <span>I design and code beautifully simple and i love what i do. Just simple like that!</span>
<form className="form" onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Enter your name.."
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Enter your e-mail.."
        required
      />
      <textarea
        name="message"
        placeholder="Write your message"
        required
        minLength={10}
      ></textarea>
      <button className="submit hover2" type="submit">
        Submit
      </button>
    </form>
        </div>
        <div data-aos="fade-left" className='right-contacta'>
          <div className='info'>
            <div className='imges'>
              <a href="tel:+923246233787">
                <FontAwesomeIcon icon={faPhone} size="30" style={{ color: "white" }} />
              </a>
            </div>
            <div className='rightcontactinfo'>
              <div>Phone</div>
              <div>+92 324 6233787</div>
            </div>
          </div>
          <div className='info'>
            <div className='imges'>
              <a href="mailto:ali0324king@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} size="30" style={{ color: "white" }} />
              </a>
            </div>
            <div className='rightcontactinfo'>
              <div>E-mail</div>
              <div>ali0324king@gmail.com</div>
            </div>
          </div>
          <div className='info'>
            <div className='imges'>
              <a
                href="https://www.google.com/maps?q=Lahore,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} size="30" style={{ color: "white" }} />
              </a>
            </div>
            <div className='rightcontactinfo'>
              <div>Adress</div>
              <div>Pakistan Punjab Lohore</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
