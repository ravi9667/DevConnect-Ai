import "./Navbar.scss";
import logo from "../../../../assets/devConnect_Ai_logo.png";

const Navbar = ({ heroComplete }) => {
    return (
        <nav className={`navbar ${heroComplete ? "navbar--visible" : ""}`}>
            <div className="navbar__container">
                <div className="navbar__logo">
                    <img
                        className="logo-image"
                        src={logo}
                        alt="DevConnect AI logo"
                        width={35}
                    />
                    DevConnect <span>AI</span>
                </div>

                <div className="navbar__links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#community">Community</a>
                </div>

                <button className="navbar__cta">
                    <span>Get Started</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;