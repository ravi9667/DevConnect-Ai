import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyLoginOtp } from "../../../../../services/auth.service";
import Loader from '../../../../../components/common/Loader/Loader'
import "./LoginOtp.scss";

const LoginOtp = () => {
    const { state } = useLocation();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (
            event.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (event) => {
        event.preventDefault();

        const enteredOtp = otp.join("");
        const email = state?.email;

        if (enteredOtp.length !== 6 || !email) {
            alert("Invalid Otp or Email");
            return;
        }

        try {
            setIsLoading(true);

            const userData = {
                email,
                otp: enteredOtp
            }

            const data = await verifyLoginOtp(userData);
            console.log(data.data)

            if(data?.data?.statusCode === 200 && data?.data?.success) {
                navigate("/desktop", { replace: true });
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            console.log("Resend OTP");

            // Resend OTP API
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="otp-page">
            { isLoading && <Loader /> }
            <div className="otp-card">
                <div className="otp-icon">✓</div>

                <p className="otp-eyebrow">SECURITY CHECK</p>

                <h1>Enter your code</h1>

                <p className="otp-description">
                    We sent a 6-digit verification code
                    to your registered email.
                </p>

                <form onSubmit={handleVerify}>
                    <div className="otp-inputs">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(element) =>
                                    (inputRefs.current[index] = element)
                                }
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(event) =>
                                    handleOtpChange(
                                        event.target.value,
                                        index
                                    )
                                }
                                onKeyDown={(event) =>
                                    handleKeyDown(event, index)
                                }
                            />
                        ))}
                    </div>

                    <p className="otp-hint">
                        Enter the 6-digit code sent to your email
                    </p>

                    <button
                        type="submit"
                        className="verify-button"
                    >
                        Verify Code <span>→</span>
                    </button>
                </form>

                <div className="resend-section">
                    <p>Didn't receive the code?</p>

                    <button
                        type="button"
                        onClick={handleResend}
                    >
                        Resend OTP
                    </button>
                </div>

                <p className="otp-footer">
                    Your security is our priority.
                </p>
            </div>
        </main>
    );
};

export default LoginOtp;