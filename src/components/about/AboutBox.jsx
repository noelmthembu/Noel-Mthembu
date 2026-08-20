import React from 'react';
const AboutBox = () =>{
    return (
        <div className="about__boxes grid">
            <div className="about__box">
                <i className="about__icon icon-fire"></i>
                <div>
                    <h3 className="about__title">5</h3>
                    <span className="about__subtitle">Projects Completed</span>
                </div>
            </div>

            <div className="about__box">
                <i className="about__icon icon-cup"></i>
                <div>
                    <h3 className="about__title">5670</h3>
                    <span className="about__subtitle">Cup of coffee</span>
                </div>
            </div>

            <div className="about__box">
                <i className="about__icon icon-people"></i>
                <div>
                    <h3 className="about__title">6</h3>
                    <span className="about__subtitle">Collaborations</span>
                </div>
            </div>

            <div className="about__box">
                <i className="about__icon"></i>
                <div>
                    <h3 className="about__title"></h3>
                    <span className="about__subtitle"></span>
                </div>
            </div>
            
        </div>
    )
}
export default AboutBox;