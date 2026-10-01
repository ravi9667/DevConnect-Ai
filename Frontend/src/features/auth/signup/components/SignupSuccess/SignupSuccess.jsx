import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getVerificationStatus,
    resendVerificationEmail
} from "../../../../../services/auth.service";
import "./SignupSuccess.scss";
import { toast } from "react-toastify";

const SignupSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const verificationSessionId =
        location.state?.verificationSessionId;

    const email = location.state?.email;

    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (!verificationSessionId || !email) {
            toast.error("Verification session is invalid");
            navigate("/signup", { replace: true });
            return;
        }

        let isMounted = true;
        let intervalId;

        const checkVerificationStatus = async () => {
            try {
                const response = await getVerificationStatus(
                    verificationSessionId
                );

                const isVerified =
                    response?.data?.isEmailVerified;

                if (isVerified && isMounted) {
                    clearInterval(intervalId);

                    toast.success("Email verification completed");

                    navigate("/desktop", {
                        replace: true,
                    });
                }
            } catch (error) {
                if (
                    error?.response?.status === 410 &&
                    isMounted
                ) {
                    clearInterval(intervalId);
                    toast.error(
                        "Verification session has expired. Please sign up again."
                    );
                }
            }
        };

        checkVerificationStatus();

        intervalId = setInterval(
            checkVerificationStatus,
            3000
        );

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [verificationSessionId, email, navigate]);

    const handleResendVerification = async () => {
        if (!email) {
            toast.error("Email not found. Please sign up again.");
            return;
        }

        try {
            setIsResending(true);

            const response = await resendVerificationEmail(email);

            if (
                response?.data?.statusCode === 200 &&
                response?.data?.success
            ) {
                toast.success(
                    response?.data?.message ||
                    "Verification email sent successfully."
                );
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to resend verification email."
            );
        } finally {
            setIsResending(false);
        }
    };

    return (
        <main className="signup-success-page">
            <div className="success-card">
                <div className="success-icon">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12.5L10 17.5L19 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <span className="success-eyebrow">
                    ACCOUNT CREATED
                </span>

                <h1>
                    Welcome to <span>DevConnect AI</span>
                </h1>

                <p className="success-description">
                    Your account has been created successfully.
                    You are just one step away from joining our
                    developer community.
                </p>

                <div className="verification-box">
                    <div className="mail-icon">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="14"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            />
                            <path
                                d="M3 7L12 13L21 7"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div>
                        <h3>Verify your email address</h3>

                        <p>
                            We have sent a verification link to
                            your email address. Please check your
                            inbox and click the verification link
                            to complete your signup.
                        </p>

                        <p>
                            This page will automatically continue
                            when your email is verified.
                        </p>
                    </div>
                </div>

                <div className="success-footer">
                    <span>Didn't receive the email?</span>

                    <button
                        type="button"
                        onClick={handleResendVerification}
                        disabled={isResending}
                    >
                        {isResending
                            ? "Sending..."
                            : "Resend verification email"}
                    </button>
                </div>

                <p className="security-note">
                    Check your spam or promotions folder if you
                    can't find the email.
                </p>
            </div>
        </main>
    );
};

export default SignupSuccess;