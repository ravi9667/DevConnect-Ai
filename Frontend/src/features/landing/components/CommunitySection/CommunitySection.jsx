import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CommunitySection.scss";

gsap.registerPlugin(ScrollTrigger);

const CommunitySection = () => {
    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const visualRef = useRef(null);
    const coreRef = useRef(null);
    const ringRef = useRef(null);
    const nodesRef = useRef([]);
    const connectionsRef = useRef([]);
    const particlesRef = useRef([]);
    const statsRef = useRef([]);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const nodes = nodesRef.current;
            const connections = connectionsRef.current;
            const particles = particlesRef.current;
            const stats = statsRef.current;

            gsap.set(
                [
                    eyebrowRef.current,
                    titleRef.current,
                    descriptionRef.current,
                    visualRef.current,
                    ...stats,
                ],
                {
                    opacity: 0,
                    y: 40,
                }
            );

            gsap.set(
                [
                    coreRef.current,
                    ringRef.current,
                    ...nodes,
                ],
                {
                    opacity: 0,
                    scale: 0.8,
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
                    ringRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.65"
                )
                .to(
                    connections,
                    {
                        scaleX: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.inOut",
                    },
                    "-=0.6"
                )
                .to(
                    nodes,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.08,
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
                    "-=0.6"
                )
                .to(
                    particles,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.03,
                        ease: "power2.out",
                    },
                    "-=0.5"
                )
                .to(
                    stats,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );

            gsap.to(ringRef.current, {
                rotation: 360,
                duration: 28,
                repeat: -1,
                ease: "none",
            });

            gsap.to(coreRef.current, {
                scale: 1.06,
                duration: 2.3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            nodes.forEach((node, index) => {
                gsap.to(node, {
                    y: index % 2 === 0 ? -8 : 8,
                    x: index % 3 === 0 ? 4 : -4,
                    duration: 2.4 + index * 0.25,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });

            connections.forEach((connection, index) => {
                gsap.to(connection, {
                    opacity: 0.25,
                    duration: 1.4,
                    delay: index * 0.18,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });

            particles.forEach((particle, index) => {
                gsap.to(particle, {
                    x: index % 2 === 0 ? 12 : -12,
                    y: index % 3 === 0 ? -14 : 14,
                    opacity: 0.2,
                    duration: 2 + (index % 4) * 0.5,
                    delay: index * 0.1,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    const addNodeRef = (element) => {
        if (element && !nodesRef.current.includes(element)) {
            nodesRef.current.push(element);
        }
    };

    const addConnectionRef = (element) => {
        if (
            element &&
            !connectionsRef.current.includes(element)
        ) {
            connectionsRef.current.push(element);
        }
    };

    const addParticleRef = (element) => {
        if (
            element &&
            !particlesRef.current.includes(element)
        ) {
            particlesRef.current.push(element);
        }
    };

    const addStatRef = (element) => {
        if (element && !statsRef.current.includes(element)) {
            statsRef.current.push(element);
        }
    };

    return (
        <section ref={sectionRef} className="community">
            <div className="community__ambient-glow" />

            <div className="community__container">
                <div className="community__header">
                    <span
                        ref={eyebrowRef}
                        className="community__eyebrow"
                    >
                        COMMUNITY
                    </span>

                    <h2
                        ref={titleRef}
                        className="community__title"
                    >
                        Where developers
                        <span> connect.</span>
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="community__description"
                    >
                        Meet developers who share your interests,
                        skills, and ambition. Build connections,
                        exchange ideas, and grow together.
                    </p>
                </div>

                <div
                    ref={visualRef}
                    className="community__visual"
                >
                    <div className="community__grid" />
                    <div className="community__scan" />

                    <div
                        ref={ringRef}
                        className="community-ring"
                    >
                        <span className="community-ring__dot community-ring__dot--one" />
                        <span className="community-ring__dot community-ring__dot--two" />
                        <span className="community-ring__dot community-ring__dot--three" />
                    </div>

                    <div
                        ref={addConnectionRef}
                        className="community-connection community-connection--one"
                    />

                    <div
                        ref={addConnectionRef}
                        className="community-connection community-connection--two"
                    />

                    <div
                        ref={addConnectionRef}
                        className="community-connection community-connection--three"
                    />

                    <div
                        ref={addConnectionRef}
                        className="community-connection community-connection--four"
                    />

                    <div
                        ref={addNodeRef}
                        className="community-node community-node--one"
                    >
                        <span>JS</span>
                        <i />
                    </div>

                    <div
                        ref={addNodeRef}
                        className="community-node community-node--two"
                    >
                        <span>React</span>
                        <i />
                    </div>

                    <div
                        ref={addNodeRef}
                        className="community-node community-node--three"
                    >
                        <span>AI</span>
                        <i />
                    </div>

                    <div
                        ref={addNodeRef}
                        className="community-node community-node--four"
                    >
                        <span>Node</span>
                        <i />
                    </div>

                    <div
                        ref={coreRef}
                        className="community-core"
                    >
                        <div className="community-core__glow" />
                        <div className="community-core__inner-ring" />

                        <div className="community-core__content">
                            <strong>DEV</strong>
                            <span>COMMUNITY</span>
                        </div>
                    </div>

                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--1"
                    />
                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--2"
                    />
                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--3"
                    />
                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--4"
                    />
                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--5"
                    />
                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--6"
                    />
                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--7"
                    />
                    <span
                        ref={addParticleRef}
                        className="community-particle community-particle--8"
                    />
                </div>

                <div className="community__stats">
                    <article
                        ref={addStatRef}
                        className="community-stat"
                    >
                        <strong>10K+</strong>
                        <span>Developers</span>
                    </article>

                    <article
                        ref={addStatRef}
                        className="community-stat"
                    >
                        <strong>2.5K+</strong>
                        <span>Projects</span>
                    </article>

                    <article
                        ref={addStatRef}
                        className="community-stat"
                    >
                        <strong>8K+</strong>
                        <span>Ideas Shared</span>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;