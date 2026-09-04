import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

import logo from "../../../../assets/devConnect_Ai_logo.png";
import "./Intro.scss";

const Intro = ({ onComplete }) => {
    const introRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const onCompleteRef = useRef(onComplete);

    onCompleteRef.current = onComplete;

    useLayoutEffect(() => {
        document.documentElement.classList.add("intro-active");
        document.body.classList.add("intro-active");

        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                onComplete: () => {
                    document.documentElement.classList.remove("intro-active");
                    document.body.classList.remove("intro-active");

                    onCompleteRef.current?.();
                },
            });

            timeline
                .fromTo(
                    titleRef.current,
                    {
                        opacity: 0,
                        y: 40,
                        scale: 0.85,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                    }
                )
                .fromTo(
                    subtitleRef.current,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "-=0.5"
                )
                .to(
                    introRef.current,
                    {
                        opacity: 0,
                        scale: 1.05,
                        duration: 1,
                        delay: 1.2,
                        ease: "power2.inOut",
                        onComplete: () => {
                            introRef.current.style.pointerEvents = "none";
                        },
                    }
                );
        }, introRef);

        return () => {
            document.documentElement.classList.remove("intro-active");
            document.body.classList.remove("intro-active");
            context.revert();
        };
    }, []);

    return (
        <div ref={introRef} className="intro">
            <div className="intro__content">
                <h1 ref={titleRef} className="intro__title">
                    <span className="intro__logo">
                        <img
                            src={logo}
                            alt="DevConnect AI logo"
                        />
                    </span>

                    DevConnect <span>AI</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="intro__subtitle"
                >
                    Developer Collaboration, Reimagined.
                </p>
            </div>
        </div>
    );
};

export default Intro;