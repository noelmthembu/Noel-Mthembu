import React, { useState } from 'react';
import "./portfolio.css";
import Menu from './Menu';

const Portfolio = () => {
    const [items, setItems] = useState(Menu);
    const [activeFilter, setActiveFilter] = useState("Everything");

    const filterItem = (filterKey) => {
        setActiveFilter(filterKey);
        if (filterKey === "Everything") {
            setItems(Menu);
            return;
        }
        const updatedItems = Menu.filter((curElem) => {
            return curElem.category.toLowerCase().includes(filterKey.toLowerCase());
        });
        setItems(updatedItems);
    };

    return (
        <section className="work container section" id="portfolio">
            <h2 className="section__title">Projects</h2>

            <div className="work__filters reveal-bottom">
                <span
                    className={`work__item ${activeFilter === "Everything" ? "active-work" : ""}`}
                    onClick={() => filterItem("Everything")}
                >
                    Everything
                </span>
                <span
                    className={`work__item ${activeFilter === "javascript" ? "active-work" : ""}`}
                    onClick={() => filterItem("javascript")}
                >
                    HTML, CSS & JS
                </span>
                <span
                    className={`work__item ${activeFilter === "bootstrap" ? "active-work" : ""}`}
                    onClick={() => filterItem("bootstrap")}
                >
                    Bootstrap
                </span>
                <span
                    className={`work__item ${activeFilter === "asp.net" ? "active-work" : ""}`}
                    onClick={() => filterItem("asp.net")}
                >
                    ASP.NET Core
                </span>
            </div>

            <div className="work__container grid">
                {items.map((elem) => {
                    const { id, image, title, category, link } = elem;
                    return (
                        <div className="work__card" key={id}>
                            <div className="work__thumbnail">
                                <img src={image} alt={title} className="work__img" />
                                <div className="work__mask"></div>
                            </div>
                            <span className="work__category">{category}</span>
                            <h3 className="work__title">{title}</h3>
                            <a href={link} target="_blank" rel='noreferrer' className="work__button">
                                <i className="icon-link work__button-icon"></i>
                            </a>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Portfolio;