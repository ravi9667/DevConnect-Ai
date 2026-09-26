import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase.js";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const signupUser = async (userData) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/signup`,
            userData,
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error(
            "Signup API Error:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const verifyEmail = async (token, tokenId, email) => {
    try {
        const response = await axios.get(
            `${API_URL}/auth/verify-email`,
            {
                params: {
                    token,
                    tokenId,
                    email,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Email Verification Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export const getVerificationStatus = async (sessionId) => {
    try {
        const response = await axios.get(
            `${API_URL}/auth/verification-status`,
            {
                params: {
                    sessionId,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Verification Status Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

// Google Login using Firebase
export const googleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        const idToken = await result.user.getIdToken();

        const response = await axios.post(
            `${API_URL}/auth/google/firebase`,
            {
                idToken,
            },
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error(
            "Firebase Google Login Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

// GitHub Login
export const githubLogin = () => {
    window.location.href = `${API_URL}/auth/github`;
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/login`,
            userData,
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error(
            "Login Error:",
            error?.response?.data || error.message
        );

        throw error;
    }
};

export const verifyLoginOtp = async (userData) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/verify-login-otp`,
            userData,
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error(
            "Login Error:",
            error?.response?.data || error.message
        );

        throw error;
    }
};