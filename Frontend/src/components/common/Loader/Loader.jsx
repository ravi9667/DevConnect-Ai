import "./Loader.scss";

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-content">
                <div className="loader-spinner">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Loader;