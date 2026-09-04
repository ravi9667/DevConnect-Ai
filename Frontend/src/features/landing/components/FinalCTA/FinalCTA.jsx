import React from "react";
import logo from "../../../../assets/devConnect_Ai_logo.png";
import "./FinalCTA.scss";

const FinalCTA = () => {
    return (
        <section className="final-cta">

            <div className="final-cta__glow final-cta__glow--one"></div>
            <div className="final-cta__glow final-cta__glow--two"></div>

            <div className="final-cta__content">

                <p className="final-cta__eyebrow">
                    READY TO BUILD TOGETHER?
                </p>

                <h2 className="final-cta__title">
                    Your next great project
                    <span> starts here.</span>
                </h2>

                <p className="final-cta__description">
                    Connect with developers, collaborate on ideas,
                    and build something meaningful together.
                </p>

                <div className="final-cta__actions">
                    <button className="final-cta__button final-cta__button--primary">
                        <span>Start Building</span>
                        <span className="final-cta__arrow">↗</span>
                    </button>

                    <button className="final-cta__button final-cta__button--secondary">
                        <span>Explore Community</span>
                        <span className="final-cta__arrow">→</span>
                    </button>
                </div>

            </div>

            <footer className="footer">

                <div className="footer-content">

                    <div className="footer-logo">
                        <div className="footer-logo__brand">
                            <img
                                src={logo}
                                alt="DevConnect AI logo"
                            />
                            <p>
                                DevConnect <span>AI</span>
                            </p>
                        </div>

                        <p className="footer-logo__description">
                            An AI-powered developer collaboration
                            platform built for the modern web.
                        </p>
                    </div>

                    <div className="footer-links">

                        <div className="footer-column">
                            <h4>Platform</h4>

                            <ul>
                                <li>
                                    <a href="#features">Features</a>
                                </li>
                                <li>
                                    <a href="#how-it-works">How It Works</a>
                                </li>
                                <li>
                                    <a href="#community">Community</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Resources</h4>

                            <ul>
                                <li>
                                    <a href="#about">About</a>
                                </li>
                                <li>
                                    <a href="#documentation">Documentation</a>
                                </li>
                                <li>
                                    <a href="#support">Support</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Connect</h4>

                            <ul>
                                <li>
                                    <a href="#github">GitHub</a>
                                </li>
                                <li>
                                    <a href="#linkedin">LinkedIn</a>
                                </li>
                                <li>
                                    <a href="#twitter">Twitter</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} DevConnect AI.
                        All Rights Reserved.
                    </p>

                    <p>
                        Built for developers, by developers.
                    </p>
                </div>

            </footer>

        </section>
    );
};

export default FinalCTA;