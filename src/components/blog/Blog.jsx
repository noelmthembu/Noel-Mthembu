import React from "react";
import "./blog.css";
import Image1 from "../../assets/blog-1.svg";
import Image2 from "../../assets/blog-2.svg";
import Image3 from "../../assets/blog-3.svg";

const Blog = () =>{
    return (
        <section className="blog container section" id="blog">
            <h2 className="section__title reveal-bottom">Latest Post</h2>

            <div className="blog__container grid">
                <div className="blog__card">
                    <div className="blog__thumb">
                        <a href="https://clickup.com/blog/app-development-tools/" target="_blank" rel='noreferrer'> <span className="blog__category">Reviews</span></a>
                        <a href="https://clickup.com/blog/app-development-tools/" target="_blank" rel='noreferrer'><img src={Image1} alt=""
                        className="blog__img"/></a>
                    </div>
                    <div className="blog__details">
                        <h3 className="blog__title">5 Best App Development Tool for Your Projects</h3>
                            <div className="blog__meta">
                                <span>05 July, 2023</span>
                                <span className="blog__dot">.</span>
                            </div>   
                    </div>
                </div>

                <div className="blog__card">
                    <div className="blog__thumb">
                        <a href="https://www.emregms.com/common-misconceptions-about-payment/" target="_blank" rel='noreferrer'> <span className="blog__category">Tutorial</span></a>
                        <a href="https://www.emregms.com/common-misconceptions-about-payment/" target="_blank" rel='noreferrer'><img src={Image2} alt=""
                        className="blog__img"/></a>
                    </div>
                    <div className="blog__details">
                        <h3 className="blog__title">Common Misconceptions About Payment</h3>
                            <div className="blog__meta">
                                <span>07 February, 2022</span>
                                <span className="blog__dot">.</span>
                            </div>
                    </div>
                </div>

                <div className="blog__card">
                    <div className="blog__thumb">
                        <a href="https://www.wearedevelopers.com/magazine/best-free-react-ui-libraries" target="_blank" rel='noreferrer'> <span className="blog__category">Guide</span></a>
                        <a href="https://www.wearedevelopers.com/magazine/best-free-react-ui-libraries" target="_blank" rel='noreferrer'><img src={Image3} alt=""
                        className="blog__img"/></a>
                    </div>
                    <div className="blog__details">
                        <h3 className="blog__title">10 Best Free React UI Libraries in 2023</h3>
                            <div className="blog__meta">
                                <span>03 January, 2023</span>
                                <span className="blog__dot">.</span>
                            </div>   
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Blog;