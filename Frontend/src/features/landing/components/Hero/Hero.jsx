import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import "./Hero.scss";
import HeroScene from "./components/HeroScene/HeroScene";

const Hero = ({ introComplete, onComplete }) => {
    const navigate = useNavigate();

    const heroRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const actionsRef = useRef(null);
    const sceneRef = useRef(null);

    const onCompleteRef = useRef(onComplete);

    useLayoutEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useLayoutEffect(() => {
        if (!introComplete) return;

        const context = gsap.context(() => {
            gsap.set(eyebrowRef.current, {
                opacity: 0,
                y: 20,
            });

            gsap.set(titleRef.current, {
                opacity: 0,
                y: 50,
            });

            gsap.set(descriptionRef.current, {
                opacity: 0,
                y: 25,
            });

            gsap.set(actionsRef.current, {
                opacity: 0,
                y: 20,
            });

            gsap.set(sceneRef.current, {
                opacity: 0,
                scale: 0.85,
                x: 60,
            });

            const timeline = gsap.timeline({
                onComplete: () => {
                    onCompleteRef.current?.();
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
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    "-=0.5"
                )
                .to(
                    actionsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.4"
                )
                .to(
                    sceneRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        duration: 1.2,
                        ease: "power3.out",
                    },
                    "-=0.7"
                );
        }, heroRef);

        return () => {
            context.revert();
        };
    }, [introComplete]);

    return (
        <div
            ref={heroRef}
            className={`container hero ${
                !introComplete ? "hero--waiting" : ""
            }`}
        >
            <div className="hero__content">
                <p
                    ref={eyebrowRef}
                    className="hero__eyebrow"
                >
                    AI-Powered Developer Collaboration
                </p>

                <h1
                    ref={titleRef}
                    className="hero__title"
                >
                    Build.
                    <br />

                    <span className="collab-title">
                        Collaborate.
                    </span>

                    <br />

                    <span className="ship-title">
                        Ship Together.
                    </span>
                </h1>

                <p
                    ref={descriptionRef}
                    className="hero__description"
                >
                    A modern developer collaboration platform
                    designed to help developers build, connect,
                    and create better software together.
                </p>

                <div
                    ref={actionsRef}
                    className="hero__actions"
                >
                    <button
                        className="hero__button hero__button--primary"
                        onClick={() => navigate("/signup")}
                    >
                        Get Started
                    </button>

                    <button
                        className="hero__button hero__button--secondary"
                        onClick={() => navigate("/login")}
                    >
                        Explore Platform
                    </button>
                </div>
            </div>

            <HeroScene sceneRef={sceneRef} />
        </div>
    );
};

export default Hero;