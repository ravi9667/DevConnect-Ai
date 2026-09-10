import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./signup.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/devConnect_Ai_logo.png";
import connect from "../../../assets/group.png";
import collaborate from "../../../assets/coding.png";
import ship from "../../../assets/startup.png";
import user from "../../../assets/user.png";
import password from "../../../assets/padlock.png";
import email from "../../../assets/mail.png";
import hide from "../../../assets/hide.png";
import unhide from "../../../assets/eye.png";
import google from "../../../assets/google.png";
import github from "../../../assets/github.png";

const Signup = () => {
    const signupRef = useRef(null);
    const toggleRef = useRef(null);
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".signup-shell", {
                opacity: 0,
                y: 18,
                duration: 0.7,
                ease: "power2.out",
            });

            gsap.from(".brand-content > *", {
                opacity: 0,
                y: 18,
                duration: 0.65,
                stagger: 0.08,
                delay: 0.15,
                ease: "power2.out",
            });

            gsap.from(".signup-card", {
                opacity: 0,
                y: 18,
                duration: 0.7,
                delay: 0.1,
                ease: "power2.out",
            });
        }, signupRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleThemeToggle = () => {
        const nextTheme = !isDark;
        setIsDark(nextTheme);

        gsap.to(toggleRef.current, {
            scale: 0.92,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
        });

        document.documentElement.classList.toggle("light-theme", !nextTheme);
    };

    return (
        <main
            ref={signupRef}
            className={`signup-page ${isDark ? "dark" : "light"}`}
        >
            <div className="page-frame">
                <div className="signup-shell">
                    <section className="brand-panel">
                        <div className="brand-content">
                            <div className="brand-logo">
                                <img src={logo} alt="DevConnect AI" />
                                <span>
                                    DevConnect <b>AI</b>
                                </span>
                            </div>

                            <div className="brand-copy">
                                <p className="eyebrow">THE DEVELOPER NETWORK</p>

                                <h1>
                                    Build.
                                    <br />
                                    Connect.
                                    <br />
                                    <span>Ship Together.</span>
                                </h1>

                                <p className="brand-description">
                                    Create your DevConnect AI account and
                                    connect with developers building the future.
                                </p>
                            </div>

                            <div className="features">
                                <div className="feature">
                                    <div className="feature-icon">
                                        <img src={connect} alt="" />
                                    </div>

                                    <div>
                                        <h3>Connect</h3>
                                        <p>
                                            Find developers and build meaningful
                                            connections.
                                        </p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">
                                        <img src={collaborate} alt="" />
                                    </div>

                                    <div>
                                        <h3>Collaborate</h3>
                                        <p>
                                            Work together on projects and ideas
                                            in real-time.
                                        </p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">
                                        <img src={ship} alt="" />
                                    </div>

                                    <div>
                                        <h3>Build & Ship</h3>
                                        <p>
                                            Turn ideas into products and ship
                                            them faster.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="brand-footer">
                            <span>© 2026 DevConnect AI</span>
                            <span>Built for developers</span>
                        </div>
                    </section>

                    <section className="form-panel">
                        <div className="form-top">
                            <div>
                                <span className="form-eyebrow">
                                    GET STARTED
                                </span>

                                <h2>Create your account</h2>

                                <p>
                                    Join DevConnect AI and start your journey.
                                </p>
                            </div>

                            <button
                                ref={toggleRef}
                                className={`theme-toggle ${isDark ? "active" : ""
                                    }`}
                                onClick={handleThemeToggle}
                                aria-label="Toggle theme"
                            >
                                <span className="toggle-icon">☼</span>
                                <span className="toggle-track">
                                    <span />
                                </span>
                                <span className="toggle-icon">☾</span>
                            </button>
                        </div>

                        <form className="signup-form">
                            <div className="form-grid">
                                <div className="field">
                                    <label htmlFor="fullName">
                                        Full Name
                                    </label>

                                    <div className="input-box">
                                        <img src={user} alt="" />
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label htmlFor="email">
                                        Email Address
                                    </label>

                                    <div className="input-box">
                                        <img src={email} alt="" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="username">Username</label>

                                <div className="input-box">
                                    <span className="username-icon">@</span>

                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="field">
                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <div className="input-box">
                                        <img src={password} alt="" />

                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    showPassword
                                                        ? hide
                                                        : unhide
                                                }
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="field">
                                    <label htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>

                                    <div className="input-box">
                                        <img src={password} alt="" />

                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    showConfirmPassword
                                                        ? hide
                                                        : unhide
                                                }
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="remember">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                            </div>

                            <button className="create-button" type="submit">
                                <span>Create Account</span>
                                <span>→</span>
                            </button>

                            <div className="divider">
                                <span />
                                <p>or continue with</p>
                                <span />
                            </div>

                            <div className="social-buttons">
                                <button type="button">
                                    <img src={github} alt="" />
                                    <span>GitHub</span>
                                </button>

                                <button type="button">
                                    <img src={google} alt="" />
                                    <span>Google</span>
                                </button>
                            </div>

                            <p className="signin">
                                Already have an account?
                                <button type="button" onClick={() => navigate("/login")}>Sign in</button>
                            </p>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Signup;