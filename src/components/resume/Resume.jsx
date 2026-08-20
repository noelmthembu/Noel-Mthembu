import React from 'react';
import "./resume.css";
import Data from "./Data";
import Card from "./Card";

const Resume = () => {
    const educationData = Data.filter((item) => item.category === "education");
    const experienceData = Data.filter((item) => item.category === "experience");

    return (
        <section className="resume container section" id="resume">
            <h2 className="section__title">
                Experience <span>&</span> Education
            </h2>

            <div className="resume__container grid">
                {/* Education Timeline */}
                <div className="timeline reveal-left">
                    <div className="timeline__header">
                        <i className="icon-graduation timeline__header-icon"></i>
                        <h3 className="timeline__header-title">Education & Certifications</h3>
                    </div>
                    <div className="timeline__items">
                        {educationData.map((val) => (
                            <Card
                                key={val.id}
                                icon={val.icon}
                                year={val.year}
                                title={val.title}
                                subtitle={val.subtitle}
                                desc={val.desc}
                            />
                        ))}
                    </div>
                </div>

                {/* Experience Timeline */}
                <div className="timeline reveal-right">
                    <div className="timeline__header">
                        <i className="icon-briefcase timeline__header-icon"></i>
                        <h3 className="timeline__header-title">Work Experience</h3>
                    </div>
                    <div className="timeline__items">
                        {experienceData.map((val) => (
                            <Card
                                key={val.id}
                                icon={val.icon}
                                year={val.year}
                                title={val.title}
                                subtitle={val.subtitle}
                                desc={val.desc}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
