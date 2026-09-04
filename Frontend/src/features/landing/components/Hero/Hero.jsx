import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

import "./Hero.scss";
import HeroScene from "./components/HeroScene/HeroScene";

const Hero = ({ introComplete, onComplete }) => {
    const heroRef = useRef(null);

    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const actionsRef = useRef(null);
    const sceneRef = useRef(null);

    const onCompleteRef = useRef(onComplete);

    // Always keep latest callback
    useLayoutEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useLayoutEffect(() => {
        if (!introComplete) return;

        const context = gsap.context(() => {

            // -------------------------
            // Initial Hero state
            // -------------------------

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


            // -------------------------
            // Hero Timeline
            // -------------------------

            const timeline = gsap.timeline({
                onComplete: () => {
                    onCompleteRef.current?.();
                },
            });

            timeline

                // Eyebrow
                .to(
                    eyebrowRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                    }
                )

                // Title
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

                // Description
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

                // Buttons
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

                // 3D Scene
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
                    Collaborate.
                    <br />
                    <span>Ship Together.</span>
                </h1>

                <p
                    ref={descriptionRef}
                    className="hero__description"
                >
                    A modern developer collaboration platform designed
                    to help developers build, connect, and create better
                    software together.
                </p>

                <div
                    ref={actionsRef}
                    className="hero__actions"
                >
                    <button
                        className="hero__button hero__button--primary"
                    >
                        Get Started
                    </button>

                    <button
                        className="hero__button hero__button--secondary"
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