import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./HowItWorks.scss";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const stepsRef = useRef([]);
    const lineRef = useRef(null);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            gsap.set(
                [
                    eyebrowRef.current,
                    titleRef.current,
                    descriptionRef.current,
                    ...stepsRef.current,
                ],
                {
                    opacity: 0,
                    y: 40,
                }
            );

            gsap.set(lineRef.current, {
                scaleX: 0,
                transformOrigin: "left center",
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                },
            });

            timeline
                .to(eyebrowRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                })
                .to(
                    titleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.4"
                )
                .to(
                    descriptionRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.55"
                )
                .to(
                    stepsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.18,
                        ease: "power3.out",
                    },
                    "-=0.35"
                )
                .to(
                    lineRef.current,
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "power3.inOut",
                    },
                    "-=0.8"
                );
        }, sectionRef);

        return () => context.revert();
    }, []);

    const addStepRef = (element) => {
        if (element && !stepsRef.current.includes(element)) {
            stepsRef.current.push(element);
        }
    };

    return (
        <section ref={sectionRef} className="how-it-works">
            <div className="how-it-works__container">
                <div className="how-it-works__header">
                    <span
                        ref={eyebrowRef}
                        className="how-it-works__eyebrow"
                    >
                        HOW IT WORKS
                    </span>

                    <h2
                        ref={titleRef}
                        className="how-it-works__title"
                    >
                        From idea to
                        <span> shipped.</span>
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="how-it-works__description"
                    >
                        DevConnect AI simplifies the journey from finding
                        the right developers to building and shipping
                        meaningful software together.
                    </p>
                </div>

                <div className="how-it-works__steps">
                    <div
                        ref={lineRef}
                        className="how-it-works__line"
                    />

                    <article
                        ref={addStepRef}
                        className="how-step"
                    >
                        <div className="how-step__marker">
                            <span>01</span>
                        </div>

                        <div className="how-step__content">
                            <span className="how-step__label">
                                CONNECT
                            </span>

                            <h3>Find the right developers.</h3>

                            <p>
                                Discover developers with the skills,
                                interests, and mindset that match your
                                project.
                            </p>
                        </div>
                    </article>

                    <article
                        ref={addStepRef}
                        className="how-step"
                    >
                        <div className="how-step__marker">
                            <span>02</span>
                        </div>

                        <div className="how-step__content">
                            <span className="how-step__label">
                                COLLABORATE
                            </span>

                            <h3>Build together.</h3>

                            <p>
                                Share ideas, work on projects, exchange
                                knowledge, and use AI-powered tools to
                                accelerate your workflow.
                            </p>
                        </div>
                    </article>

                    <article
                        ref={addStepRef}
                        className="how-step"
                    >
                        <div className="how-step__marker">
                            <span>03</span>
                        </div>

                        <div className="how-step__content">
                            <span className="how-step__label">
                                SHIP
                            </span>

                            <h3>Turn ideas into reality.</h3>

                            <p>
                                Move from collaboration to a working
                                product and ship software with confidence.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;