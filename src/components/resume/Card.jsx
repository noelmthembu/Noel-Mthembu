import React from 'react';

const Card = ({ icon, year, title, subtitle, desc }) => {
    return (
        <div className="timeline__item">
            <div className="timeline__icon-box">
                <i className={icon}></i>
            </div>
            <span className="timeline__date">{year}</span>
            <h3 className="timeline__title">{title}</h3>
            {subtitle && <h4 className="timeline__subtitle">{subtitle}</h4>}
            {desc && typeof desc === 'string' && (
                <p className="timeline__text">{desc}</p>
            )}
            {Array.isArray(desc) && desc.length > 0 && (
                <ul className="timeline__list">
                    {desc.map((item, index) => (
                        <li key={index} className="timeline__list-item">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Card;