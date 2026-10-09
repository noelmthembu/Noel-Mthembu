import React, { useState } from 'react';
import './contact.css';
import { playLaserSound, playBlipSound } from '../../utils/retroAudio';

const Contact = () => {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = () => {
    playLaserSound();
    setFormSent(true);
  };

  return (
    <section className="contact container section" id="contact">
      <div className="section-header-wrap">
        <h2 className="section__title">Communications Terminal</h2>
        <div className="section__subtitle">LEVEL 04: SEND TRANSMISSION & ESTABLISH COMMS</div>
      </div>

      <div className="contact__container grid">
        {/* Left Information Panel */}
        <div className="contact__info pixel-panel">
          <div className="info-terminal-head">
            <span className="terminal-badge">COMMS CHANNELS</span>
            <span className="terminal-live">● ONLINE</span>
          </div>

          <h3 className="contact__title">LET'S CONNECT</h3>
          <p className="contact__details">
            Interested in hiring an enthusiastic, fast-learning Software Developer for your team?
            Send an instant packet through this terminal or connect across channels.
          </p>

          <div className="contact-methods-list">
            <a
              href="mailto:emailnoel01.com@gmail.com"
              className="contact-channel-item"
              onMouseEnter={() => playBlipSound()}
            >
              <i className="fa-solid fa-envelope channel-icon"></i>
              <div>
                <span className="channel-label">EMAIL TRANSMISSION</span>
                <span className="channel-val">emailnoel01.com@gmail.com</span>
              </div>
            </a>

            <a
              href="https://wa.me/+27671540292"
              target="_blank"
              rel="noreferrer"
              className="contact-channel-item"
              onMouseEnter={() => playBlipSound()}
            >
              <i className="fa-brands fa-whatsapp channel-icon"></i>
              <div>
                <span className="channel-label">DIRECT WHATSAPP</span>
                <span className="channel-val">+27 67 154 0292</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/noel-mthembu-433173242/"
              target="_blank"
              rel="noreferrer"
              className="contact-channel-item"
              onMouseEnter={() => playBlipSound()}
            >
              <i className="fa-brands fa-linkedin channel-icon"></i>
              <div>
                <span className="channel-label">PROFESSIONAL NETWORK</span>
                <span className="channel-val">linkedin.com/in/noel-mthembu</span>
              </div>
            </a>

            <a
              href="https://github.com/noelmthembu/"
              target="_blank"
              rel="noreferrer"
              className="contact-channel-item"
              onMouseEnter={() => playBlipSound()}
            >
              <i className="fa-brands fa-github channel-icon"></i>
              <div>
                <span className="channel-label">CODE REPOSITORY</span>
                <span className="channel-val">github.com/noelmthembu</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Transmission Form */}
        <div className="contact__form-panel pixel-panel">
          <div className="form-terminal-head">
            <span className="head-prompt">SEND_PACKET.EXE</span>
            <span className="head-enc">SECURE POST // 256-BIT</span>
          </div>

          <form
            className="contact__form"
            action="https://formspree.io/f/xknavwzp"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="contact__form-group">
              <div className="contact__form-div">
                <label className="field-label" htmlFor="contact-name">SENDER NAME:</label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  className="contact__form-input"
                  placeholder="e.g. Elena Vance"
                  required
                />
              </div>

              <div className="contact__form-div">
                <label className="field-label" htmlFor="contact-email">RETURN EMAIL:</label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  className="contact__form-input"
                  placeholder="e.g. elena@company.com"
                  required
                />
              </div>
            </div>

            <div className="contact__form-div">
              <label className="field-label" htmlFor="contact-subject">TRANSMISSION SUBJECT:</label>
              <input
                type="text"
                name="_subject"
                id="contact-subject"
                className="contact__form-input"
                placeholder="e.g. Software Developer Opportunity"
                required
              />
            </div>

            <div className="contact__form-div contact__form-area">
              <label className="field-label" htmlFor="Message">PACKET PAYLOAD / MESSAGE:</label>
              <textarea
                name="message"
                cols="30"
                rows="6"
                id="Message"
                placeholder="Write your transmission details here..."
                className="contact__form-input contact__form-textarea"
                required
              ></textarea>
            </div>

            <button type="submit" className="pixel-btn btn--gold contact-submit-btn">
              ⚡ TRANSMIT MESSAGE
            </button>

            {formSent && (
              <div className="form-sent-notification">
                <span>PACKET TRANSMITTED TO NOEL MTHEMBU! THANK YOU.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
