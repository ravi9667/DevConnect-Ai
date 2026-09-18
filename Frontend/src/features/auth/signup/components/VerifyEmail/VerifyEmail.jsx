import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../../../../services/auth.service";
import "./VerifyEmail.scss";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const hasVerified = useRef(false);

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (hasVerified.current) return;

        hasVerified.current = true;

        const verifyUserEmail = async () => {
            const token = searchParams.get("token");
            const tokenId = searchParams.get("tokenId");
            const email = searchParams.get("email");

            if (!token || !tokenId || !email) {
                setStatus("error");
                setMessage("Invalid or incomplete verification link.");
                return;
            }

            try {
                const response = await verifyEmail(
                    token,
                    tokenId,
                    email
                );

                if (response?.statusCode === 200 && response?.success) {
                    setStatus("success");
                    setMessage(
                        response.message || "Your email has been verified successfully."
                    );
                    return;
                }

                setStatus("error");
                setMessage(
                    response?.message || "Email verification failed."
                );
            } catch (error) {
                setStatus("error");

                setMessage(
                    error.response?.data?.message ||
                    "Verification link is invalid or expired."
                );
            }
        };

        verifyUserEmail();
    }, [searchParams]);

    return (
        <main className="verify-email-page">
            <div className="verify-email-card">
                {status === "loading" && (
                    <>
                        <div className="verify-loader"></div>

                        <span className="verify-label">
                            EMAIL VERIFICATION
                        </span>

                        <h1>Verifying your email...</h1>

                        <p>
                            Please wait while we verify your email address.
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="verify-icon success-icon">
                            ✓
                        </div>

                        <span className="verify-label">
                            VERIFICATION COMPLETE
                        </span>

                        <h1>Email verified successfully!</h1>

                        <p>{message}</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="verify-icon error-icon">
                            !
                        </div>

                        <span className="verify-label">
                            VERIFICATION FAILED
                        </span>

                        <h1>Unable to verify email</h1>

                        <p>{message}</p>

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Go to Login →
                        </button>
                    </>
                )}
            </div>
        </main>
    );
};

export default VerifyEmail;