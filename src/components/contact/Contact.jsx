import React from 'react';
import "./contact.css";

const Contact = () =>{
    return (
        <section className="contact container section" id='contact'>
          <h2 className="section__title reveal-bottom">Get In Touch</h2>

          <div className="contact__container grid">
            <div className="contact__info">
                <h3 className="contact__title">Don't be shy !</h3>
                <p className="contact__details">Don't like forms? Send me an email. 👋</p>
            </div>

            <form className="contact__form" action="https://formspree.io/f/xknavwzp"
                  method="POST">
              <div className="contact__form-group">
                <div className="contact__form-div">
                <input type="text" name="name" id="contact-name" className="contact__form-input" 
                placeholder="YOUR NAME" required />
                </div>

                <div className="contact__form-div">
                <input type="email"name="email" id="contact-email" className="contact__form-input" 
                placeholder="YOUR EMAIL" required/>
                </div>
            </div>
                <div className="contact__form-div">
                    <input type="text" name="_subject" id="contact-subject" className="contact__form-input"
                     placeholder="YOUR SUBJECT" required />
                </div>

                <div className="contact__form-div contact__form-area">
                    <textarea name="message"
                      cols="30"
                     rows="10"
                    id="Message" placeholder="YOUR MESSAGE" className="contact__form-input" required></textarea>
                    
                </div>
                <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </section>
    );
}
export default Contact;
