import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/devConnect_Ai_logo.png";
import connect from "../../../assets/group.png";
import collaborate from "../../../assets/coding.png";
import ship from "../../../assets/startup.png";
import user from "../../../assets/user.png";
import password from "../../../assets/padlock.png";
import hide from "../../../assets/hide.png";
import unhide from "../../../assets/eye.png";
import google from "../../../assets/google.png";
import github from "../../../assets/github.png";

const Login = () => {
    const loginRef = useRef(null);
    const toggleRef = useRef(null);
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".login-shell", {
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

            gsap.from(".login-card", {
                opacity: 0,
                y: 18,
                duration: 0.7,
                delay: 0.1,
                ease: "power2.out",
            });
        }, loginRef);

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
            ref={loginRef}
            className={`login-page ${isDark ? "dark" : "light"}`}
        >
            <div className="page-frame">
                <div className="login-shell">
                    <section className="brand-panel">
                        <div className="brand-content">
                            <div className="brand-logo">
                                <img src={logo} alt="DevConnect AI" />
                                <span>
                                    DevConnect <b>AI</b>
                                </span>
                            </div>

                            <div className="brand-copy">
                                <p className="eyebrow">WELCOME BACK</p>

                                <h1>
                                    Pick Up.
                                    <br />
                                    Right Where.
                                    <br />
                                    <span>You Left Off.</span>
                                </h1>

                                <p className="brand-description">
                                    Sign in to get back to your projects,
                                    your conversations, and the developers
                                    you build with.
                                </p>
                            </div>

                            <div className="features">
                                <div className="feature">
                                    <div className="feature-icon">
                                        <img src={connect} alt="" />
                                    </div>

                                    <div>
                                        <h3>Your Network</h3>
                                        <p>
                                            Reconnect with the developers you
                                            follow and collaborate with.
                                        </p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">
                                        <img src={collaborate} alt="" />
                                    </div>

                                    <div>
                                        <h3>Active Projects</h3>
                                        <p>
                                            Jump back into ongoing
                                            collaborations without missing a
                                            beat.
                                        </p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">
                                        <img src={ship} alt="" />
                                    </div>

                                    <div>
                                        <h3>Keep Shipping</h3>
                                        <p>
                                            Continue exactly where you left
                                            your work last time.
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
                                    GOOD TO SEE YOU
                                </span>

                                <h2>Sign in to your account</h2>

                                <p>
                                    Enter your details to continue to
                                    DevConnect AI.
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

                        <form className="login-form">
                            <div className="field">
                                <label htmlFor="identifier">
                                    Email or Username
                                </label>

                                <div className="input-box">
                                    <img src={user} alt="" />
                                    <input
                                        id="identifier"
                                        name="identifier"
                                        type="text"
                                        placeholder="Enter your email or username"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="password">Password</label>

                                <div className="input-box">
                                    <img src={password} alt="" />

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <img
                                            src={showPassword ? hide : unhide}
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="remember">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>

                                <button type="button" className="forgot">
                                    Forgot password?
                                </button>
                            </div>

                            <button className="create-button" type="submit">
                                <span>Sign In</span>
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
                                Don't have an account?
                                <button type="button" onClick={() => navigate("/signup")}>Sign up</button>
                            </p>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Login;