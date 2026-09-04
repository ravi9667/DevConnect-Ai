import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AiSection.scss";

gsap.registerPlugin(ScrollTrigger);

const AiSection = () => {
    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const visualRef = useRef(null);
    const cardsRef = useRef([]);
    const outerOrbitRef = useRef(null);
    const innerOrbitRef = useRef(null);
    const coreRef = useRef(null);
    const glowRef = useRef(null);
    const connectionsRef = useRef([]);
    const nodesRef = useRef([]);
    const particlesRef = useRef([]);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const particles = particlesRef.current;
            const connections = connectionsRef.current;
            const nodes = nodesRef.current;

            gsap.set(
                [
                    eyebrowRef.current,
                    titleRef.current,
                    descriptionRef.current,
                    visualRef.current,
                    ...cardsRef.current,
                ],
                {
                    opacity: 0,
                    y: 40,
                }
            );

            gsap.set(
                [
                    outerOrbitRef.current,
                    innerOrbitRef.current,
                    coreRef.current,
                    ...nodes,
                ],
                {
                    opacity: 0,
                    scale: 0.85,
                }
            );

            gsap.set(connections, {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(particles, {
                opacity: 0,
                scale: 0,
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
                    visualRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.35"
                )
                .to(
                    outerOrbitRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                    },
                    "-=0.65"
                )
                .to(
                    innerOrbitRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.85"
                )
                .to(
                    connections,
                    {
                        scaleX: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.inOut",
                    },
                    "-=0.65"
                )
                .to(
                    nodes,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                    },
                    "-=0.55"
                )
                .to(
                    coreRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.9,
                        ease: "back.out(1.7)",
                    },
                    "-=0.65"
                )
                .to(
                    particles,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.025,
                        ease: "power2.out",
                    },
                    "-=0.6"
                )
                .to(
                    cardsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    "-=0.35"
                );

            gsap.to(outerOrbitRef.current, {
                rotation: 360,
                duration: 24,
                repeat: -1,
                ease: "none",
            });

            gsap.to(innerOrbitRef.current, {
                rotation: -360,
                duration: 16,
                repeat: -1,
                ease: "none",
            });

            gsap.to(coreRef.current, {
                scale: 1.06,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(glowRef.current, {
                opacity: 0.75,
                scale: 1.25,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            connections.forEach((connection, index) => {
                gsap.to(connection, {
                    opacity: 0.25,
                    duration: 1.1,
                    delay: index * 0.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });

            nodes.forEach((node, index) => {
                gsap.to(node, {
                    y: index % 2 === 0 ? -7 : 7,
                    duration: 2.5 + index * 0.25,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });

            particles.forEach((particle, index) => {
                gsap.to(particle, {
                    y: index % 2 === 0 ? -18 : 18,
                    x: index % 3 === 0 ? 10 : -10,
                    opacity: 0.25,
                    duration: 2 + (index % 4) * 0.5,
                    delay: index * 0.08,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    const addCardRef = (element) => {
        if (element && !cardsRef.current.includes(element)) {
            cardsRef.current.push(element);
        }
    };

    const addConnectionRef = (element) => {
        if (element && !connectionsRef.current.includes(element)) {
            connectionsRef.current.push(element);
        }
    };

    const addNodeRef = (element) => {
        if (element && !nodesRef.current.includes(element)) {
            nodesRef.current.push(element);
        }
    };

    const addParticleRef = (element) => {
        if (element && !particlesRef.current.includes(element)) {
            particlesRef.current.push(element);
        }
    };

    return (
        <section ref={sectionRef} className="ai-section">
            <div className="ai-section__ambient-glow" />

            <div className="ai-section__container">
                <div className="ai-section__header">
                    <span
                        ref={eyebrowRef}
                        className="ai-section__eyebrow"
                    >
                        AI-POWERED
                    </span>

                    <h2
                        ref={titleRef}
                        className="ai-section__title"
                    >
                        Build smarter.
                        <span> Together.</span>
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="ai-section__description"
                    >
                        DevConnect AI brings intelligence into the
                        development workflow, helping developers find
                        the right people, solve problems faster, and
                        turn ideas into working products.
                    </p>
                </div>

                <div
                    ref={visualRef}
                    className="ai-section__visual"
                >
                    <div className="ai-section__scan" />

                    <div className="ai-orbit ai-orbit--outer" ref={outerOrbitRef}>
                        <span className="orbit-dot orbit-dot--one" />
                        <span className="orbit-dot orbit-dot--two" />
                    </div>

                    <div className="ai-orbit ai-orbit--inner" ref={innerOrbitRef}>
                        <span className="orbit-dot orbit-dot--three" />
                    </div>

                    <div
                        ref={addConnectionRef}
                        className="ai-connection ai-connection--one"
                    />

                    <div
                        ref={addConnectionRef}
                        className="ai-connection ai-connection--two"
                    />

                    <div
                        ref={addNodeRef}
                        className="ai-node ai-node--developer"
                    >
                        <div className="ai-node__pulse" />
                        <span>Developer</span>
                    </div>

                    <div
                        ref={addNodeRef}
                        className="ai-node ai-node--project"
                    >
                        <div className="ai-node__pulse" />
                        <span>Project</span>
                    </div>

                    <div
                        ref={coreRef}
                        className="ai-core"
                    >
                        <div
                            ref={glowRef}
                            className="ai-core__glow"
                        />

                        <div className="ai-core__ring ai-core__ring--one" />
                        <div className="ai-core__ring ai-core__ring--two" />

                        <div className="ai-core__content">
                            <span>AI</span>
                            <small>INTELLIGENCE</small>
                        </div>
                    </div>

                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--1"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--2"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--3"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--4"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--5"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--6"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--7"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--8"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--9"
                    />
                    <span
                        ref={addParticleRef}
                        className="ai-particle ai-particle--10"
                    />
                </div>

                <div className="ai-section__features">
                    <article
                        ref={addCardRef}
                        className="ai-feature"
                    >
                        <span className="ai-feature__number">
                            01
                        </span>

                        <div>
                            <span className="ai-feature__label">
                                MATCH
                            </span>

                            <h3>Find the right developers.</h3>

                            <p>
                                AI helps connect projects with developers
                                based on skills, interests, and goals.
                            </p>
                        </div>
                    </article>

                    <article
                        ref={addCardRef}
                        className="ai-feature"
                    >
                        <span className="ai-feature__number">
                            02
                        </span>

                        <div>
                            <span className="ai-feature__label">
                                ASSIST
                            </span>

                            <h3>Get intelligent assistance.</h3>

                            <p>
                                Get help understanding problems, exploring
                                ideas, and making better technical decisions.
                            </p>
                        </div>
                    </article>

                    <article
                        ref={addCardRef}
                        className="ai-feature"
                    >
                        <span className="ai-feature__number">
                            03
                        </span>

                        <div>
                            <span className="ai-feature__label">
                                ACCELERATE
                            </span>

                            <h3>Move from idea to execution.</h3>

                            <p>
                                Reduce friction in your workflow and spend
                                more time building meaningful software.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default AiSection;