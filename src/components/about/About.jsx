import React from 'react';
import "./about.css";
import Image from "../../assets/profile.jpeg";
import AboutBox from "./AboutBox"
const About = () =>{
    return (
        <section className="about container section" id='about'>
            <h2 className="section__title">About Me</h2>

            <div className="about__container grid">
                <img src={Image} alt="" className="about__img" />

                <div className="about__data grid">
                    <div className="about__info">
                        <p className="about__description">
                        Dedicated and highly motivated recent graduate with
                         a Diploma in Software Development, seeking an entry-level position as a Software Developer to apply my knowledge and
                           skills in developing innovative software solutions. 
                        </p>
                        <a download="" href="resume/Noel Mthembu__Resume 2023.pdf" target="_blank" className="btn">Download Resume
                        <i className="icon-download"></i></a>
                        
                    </div>

                    <div className="about__skills grid">
                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">c#</h3>
                                <span className="skills__number">80%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage c-sharp"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">java</h3>
                                <span className="skills__number">70%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage java"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">html</h3>
                                <span className="skills__number">80%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage html"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">css</h3>
                                <span className="skills__number">70%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage css"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">javascript</h3>
                                <span className="skills__number">50%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage javascript"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">php</h3>
                                <span className="skills__number">70%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage php"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">azure</h3>
                                <span className="skills__number">80%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage azure"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">bootstrap</h3>
                                <span className="skills__number">70%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage bootstrap"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">react js</h3>
                                <span className="skills__number">40%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage react-js"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">rest api</h3>
                                <span className="skills__number">60%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage rest-api"></span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">mysql</h3>
                                <span className="skills__number">80%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage sql"></span>
                            </div>
                        </div>

                        
                        <div className="skills__data">
                            <div className="skills__title">
                                <h3 className="skills__name">git</h3>
                                <span className="skills__number">50%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage git"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AboutBox/>
        </section>
    )
}
export default About;