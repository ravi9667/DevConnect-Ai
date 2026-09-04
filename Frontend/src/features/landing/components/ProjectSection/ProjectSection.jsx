import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ProjectSection.scss";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const visualRef = useRef(null);
    const workspaceRef = useRef(null);
    const progressRef = useRef(null);
    const insightRef = useRef(null);
    const metaRef = useRef([]);
    const membersRef = useRef([]);
    const activitiesRef = useRef([]);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const meta = metaRef.current;
            const members = membersRef.current;
            const activities = activitiesRef.current;

            gsap.set(
                [
                    eyebrowRef.current,
                    titleRef.current,
                    descriptionRef.current,
                    visualRef.current,
                ],
                {
                    opacity: 0,
                    y: 40,
                }
            );

            gsap.set(workspaceRef.current, {
                opacity: 0,
                y: 70,
                scale: 0.96,
                rotateX: 8,
            });

            gsap.set(
                [
                    ...meta,
                    ...members,
                    ...activities,
                    insightRef.current,
                ],
                {
                    opacity: 0,
                    y: 18,
                }
            );

            gsap.set(progressRef.current, {
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
                    visualRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.3"
                )
                .to(
                    workspaceRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                        duration: 1.2,
                        ease: "power3.out",
                    },
                    "-=0.45"
                )
                .to(
                    meta,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.07,
                        ease: "power3.out",
                    },
                    "-=0.7"
                )
                .to(
                    insightRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    "-=0.35"
                )
                .to(
                    members,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.4"
                )
                .to(
                    activities,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.3"
                )
                .to(
                    progressRef.current,
                    {
                        scaleX: 0.68,
                        duration: 1.2,
                        ease: "power3.out",
                    },
                    "-=0.35"
                );

            gsap.to(workspaceRef.current, {
                y: -7,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(insightRef.current, {
                y: -5,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(progressRef.current, {
                opacity: 0.7,
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    const addMetaRef = (element) => {
        if (element && !metaRef.current.includes(element)) {
            metaRef.current.push(element);
        }
    };

    const addMemberRef = (element) => {
        if (
            element &&
            !membersRef.current.includes(element)
        ) {
            membersRef.current.push(element);
        }
    };

    const addActivityRef = (element) => {
        if (
            element &&
            !activitiesRef.current.includes(element)
        ) {
            activitiesRef.current.push(element);
        }
    };

    return (
        <section ref={sectionRef} className="projects">
            <div className="projects__ambient-glow" />
            <div className="projects__grid" />

            <div className="projects__container">
                <div className="projects__header">
                    <span
                        ref={eyebrowRef}
                        className="projects__eyebrow"
                    >
                        PROJECTS
                    </span>

                    <h2
                        ref={titleRef}
                        className="projects__title"
                    >
                        Build something
                        <span> meaningful.</span>
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="projects__description"
                    >
                        Turn ideas into real products by bringing
                        the right developers, tools, and intelligence
                        into one collaborative workspace.
                    </p>
                </div>

                <div
                    ref={visualRef}
                    className="projects__visual"
                >
                    <div
                        ref={workspaceRef}
                        className="project-workspace"
                    >
                        <div className="project-workspace__top">
                            <div className="workspace-brand">
                                <span className="workspace-brand__dot" />
                                <span>DEVCONNECT</span>
                                <small>/ PROJECT</small>
                            </div>

                            <div className="workspace-status">
                                <i />
                                ACTIVE
                            </div>
                        </div>

                        <div className="project-workspace__body">
                            <div className="project-main">
                                <div className="project-main__heading">
                                    <div>
                                        <span className="workspace-label">
                                            PROJECT
                                        </span>

                                        <h3>
                                            AI Developer
                                            <br />
                                            Platform
                                        </h3>
                                    </div>

                                    <span className="project-id">
                                        #DC-0248
                                    </span>
                                </div>

                                <p className="project-main__description">
                                    Building the next generation
                                    of developer collaboration.
                                </p>

                                <div className="project-tags">
                                    <span ref={addMetaRef}>
                                        React
                                    </span>
                                    <span ref={addMetaRef}>
                                        Node
                                    </span>
                                    <span ref={addMetaRef}>
                                        AI
                                    </span>
                                    <span ref={addMetaRef}>
                                        MongoDB
                                    </span>
                                </div>

                                <div className="project-progress">
                                    <div className="project-progress__header">
                                        <span>
                                            PROJECT PROGRESS
                                        </span>

                                        <strong>68%</strong>
                                    </div>

                                    <div className="project-progress__track">
                                        <div
                                            ref={progressRef}
                                            className="project-progress__bar"
                                        />
                                    </div>
                                </div>

                                <div className="project-main__footer">
                                    <span>
                                        <i />
                                        3 developers collaborating
                                    </span>

                                    <span>
                                        Updated just now
                                    </span>
                                </div>
                            </div>

                            <div className="project-side">
                                <div
                                    ref={insightRef}
                                    className="ai-insight"
                                >
                                    <div className="ai-insight__top">
                                        <span>
                                            <i />
                                            AI INSIGHT
                                        </span>

                                        <small>LIVE</small>
                                    </div>

                                    <p>
                                        Your backend API is ready
                                        for review.
                                    </p>

                                    <span className="ai-insight__action">
                                        View suggestion
                                        <b>→</b>
                                    </span>
                                </div>

                                <div className="project-team">
                                    <span className="workspace-label">
                                        TEAM
                                    </span>

                                    <div className="team-list">
                                        <div
                                            ref={addMemberRef}
                                            className="team-member"
                                        >
                                            <span className="team-member__avatar">
                                                JD
                                            </span>

                                            <div>
                                                <strong>
                                                    Developer
                                                </strong>
                                                <small>
                                                    Frontend
                                                </small>
                                            </div>

                                            <i className="online" />
                                        </div>

                                        <div
                                            ref={addMemberRef}
                                            className="team-member"
                                        >
                                            <span className="team-member__avatar">
                                                AK
                                            </span>

                                            <div>
                                                <strong>
                                                    Developer
                                                </strong>
                                                <small>
                                                    Backend
                                                </small>
                                            </div>

                                            <i className="online" />
                                        </div>

                                        <div
                                            ref={addMemberRef}
                                            className="team-member"
                                        >
                                            <span className="team-member__avatar team-member__avatar--ai">
                                                AI
                                            </span>

                                            <div>
                                                <strong>
                                                    AI Assistant
                                                </strong>
                                                <small>
                                                    Active
                                                </small>
                                            </div>

                                            <i className="online" />
                                        </div>
                                    </div>
                                </div>

                                <div className="project-activity">
                                    <span className="workspace-label">
                                        RECENT ACTIVITY
                                    </span>

                                    <div
                                        ref={addActivityRef}
                                        className="activity"
                                    >
                                        <i />
                                        <span>
                                            New developer joined
                                        </span>
                                        <small>2m</small>
                                    </div>

                                    <div
                                        ref={addActivityRef}
                                        className="activity"
                                    >
                                        <i />
                                        <span>
                                            AI suggestion generated
                                        </span>
                                        <small>8m</small>
                                    </div>

                                    <div
                                        ref={addActivityRef}
                                        className="activity"
                                    >
                                        <i />
                                        <span>
                                            Project updated
                                        </span>
                                        <small>14m</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="projects__bottom">
                    <div>
                        <span>01</span>
                        <strong>DISCOVER</strong>
                        <p>
                            Find projects worth building.
                        </p>
                    </div>

                    <div>
                        <span>02</span>
                        <strong>COLLABORATE</strong>
                        <p>
                            Bring the right developers together.
                        </p>
                    </div>

                    <div>
                        <span>03</span>
                        <strong>SHIP</strong>
                        <p>
                            Turn ideas into working products.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;