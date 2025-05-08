import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'your_service_id',        // Replace with your EmailJS Service ID
      'your_template_id',       // Replace with your EmailJS Template ID
      form.current,
      'your_public_key'         // Replace with your EmailJS Public Key
    ).then(
      (result) => {
        console.log(result.text);
        alert("Message sent successfully!");
        form.current.reset();
      },
      (error) => {
        console.log(error.text);
        alert("Message failed to send.");
      }
    );
  };

  return (
    <section className="contact container section" id='contact'>
      <h2 className="section__title">Get In Touch</h2>
      <div className="contact__container grid">
        <div className="contact__info">
          <h3 className="contact__title">Don't be shy !</h3>
          <p className="contact__details">Don't like forms? Send me an email. 👋</p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="contact__form">
          <div className="contact__form-group">
            <div className="contact__form-div">
              <input type="text" name="user_name" className="contact__form-input" placeholder="YOUR NAME" required />
            </div>

            <div className="contact__form-div">
              <input type="email" name="user_email" className="contact__form-input" placeholder="YOUR EMAIL" required />
            </div>
          </div>

          <div className="contact__form-div">
            <input type="text" name="subject" className="contact__form-input" placeholder="YOUR SUBJECT" required />
          </div>

          <div className="contact__form-div contact__form-area">
            <textarea name="message" rows="10" className="contact__form-input" placeholder="YOUR MESSAGE" required></textarea>
          </div>

          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
