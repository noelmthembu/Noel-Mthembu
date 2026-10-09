import React, { useState } from 'react';
import './resume.css';
import Data from './Data';
import Card from './Card';
import { playBlipSound } from '../../utils/retroAudio';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'education' | 'experience'

  const educationData = Data.filter((item) => item.category === 'education');
  const experienceData = Data.filter((item) => item.category === 'experience');

  return (
    <section className="resume container section" id="resume">
      <div className="section-header-wrap">
        <h2 className="section__title">Expedition Lore & Skill Tree</h2>
        <div className="section__subtitle">LEVEL 03: THE CHRONICLES OF EXPERIENCE & EDUCATION</div>
      </div>

      {/* Filter Tabs for Timelines */}
      <div className="resume__tab-bar">
        <button
          className={`resume__tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => {
            playBlipSound();
            setActiveTab('all');
          }}
        >
          ALL CHRONICLES
        </button>
        <button
          className={`resume__tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => {
            playBlipSound();
            setActiveTab('experience');
          }}
        >
          WORK EXPERIENCE ({experienceData.length})
        </button>
        <button
          className={`resume__tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => {
            playBlipSound();
            setActiveTab('education');
          }}
        >
          EDUCATION & CERTS ({educationData.length})
        </button>
      </div>

      <div className="resume__container grid">
        {/* Education Timeline */}
        {(activeTab === 'all' || activeTab === 'education') && (
          <div className="timeline pixel-panel">
            <div className="timeline__header">
              <i className="icon-graduation timeline__header-icon"></i>
              <div className="header-text-block">
                <h3 className="timeline__header-title">Education & Certifications</h3>
                <span className="timeline__header-sub">KNOWLEDGE MASTERY TREE</span>
              </div>
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
        )}

        {/* Experience Timeline */}
        {(activeTab === 'all' || activeTab === 'experience') && (
          <div className="timeline pixel-panel">
            <div className="timeline__header">
              <i className="icon-briefcase timeline__header-icon"></i>
              <div className="header-text-block">
                <h3 className="timeline__header-title">Work Experience</h3>
                <span className="timeline__header-sub">CAMPAIGN DEPLOYMENTS</span>
              </div>
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
        )}
      </div>
    </section>
  );
};

export default Resume;
