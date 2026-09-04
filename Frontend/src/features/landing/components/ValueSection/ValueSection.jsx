import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ValueSection.scss";

gsap.registerPlugin(ScrollTrigger);

const ValueSection = () => {
    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            gsap.set(
                [
                    eyebrowRef.current,
                    titleRef.current,
                    descriptionRef.current,
                    ...cardsRef.current,
                ],
                {
                    opacity: 0,
                    y: 40,
                }
            );

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            timeline
                .to(eyebrowRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                })
                .to(
                    titleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power3.out",
                    },
                    "-=0.35"
                )
                .to(
                    descriptionRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    "-=0.5"
                )
                .to(
                    cardsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    "-=0.35"
                );
        }, sectionRef);

        return () => context.revert();
    }, []);

    const addCardRef = (element) => {
        if (element && !cardsRef.current.includes(element)) {
            cardsRef.current.push(element);
        }
    };

    return (
        <section ref={sectionRef} className="value-section">
            <div className="value-section__container">

                <div className="value-section__header">

                    <span
                        ref={eyebrowRef}
                        className="value-section__eyebrow"
                    >
                        BUILT FOR DEVELOPERS
                    </span>

                    <h2
                        ref={titleRef}
                        className="value-section__title"
                    >
                        Everything you need to
                        <span> build better.</span>
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="value-section__description"
                    >
                        DevConnect AI brings developers, collaboration,
                        and intelligent tools together in one modern
                        development ecosystem.
                    </p>

                </div>

                <div className="value-section__cards">

                    <article
                        ref={addCardRef}
                        className="value-card"
                    >
                        <div className="value-card__number">
                            01
                        </div>

                        <div className="value-card__icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M12 3v18" />
                                <path d="M3 12h18" />
                                <path d="m5 5 14 14" />
                                <path d="m19 5-14 14" />
                            </svg>
                        </div>

                        <h3>
                            Build Faster
                        </h3>

                        <p>
                            Build modern applications with powerful
                            developer tools, AI assistance, and a workflow
                            designed around productivity.
                        </p>

                        <div className="value-card__line" />
                    </article>

                    <article
                        ref={addCardRef}
                        className="value-card"
                    >
                        <div className="value-card__number">
                            02
                        </div>

                        <div className="value-card__icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <circle cx="9" cy="8" r="3" />
                                <circle cx="17" cy="10" r="2.5" />
                                <path d="M3 20c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" />
                                <path d="M14 15.5c2.8-.5 5.5 1.2 6 4.5" />
                            </svg>
                        </div>

                        <h3>
                            Collaborate Better
                        </h3>

                        <p>
                            Connect with developers, share ideas, work
                            together, and turn individual skills into
                            meaningful collaboration.
                        </p>

                        <div className="value-card__line" />
                    </article>

                    <article
                        ref={addCardRef}
                        className="value-card"
                    >
                        <div className="value-card__number">
                            03
                        </div>

                        <div className="value-card__icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M4 17 10 11l4 4 6-7" />
                                <path d="M16 8h4v4" />
                                <path d="M4 21h16" />
                            </svg>
                        </div>

                        <h3>
                            Ship Smarter
                        </h3>

                        <p>
                            Move from idea to implementation faster with
                            an ecosystem that helps you stay focused on
                            building and shipping.
                        </p>

                        <div className="value-card__line" />
                    </article>

                </div>
            </div>
        </section>
    );
};

export default ValueSection;