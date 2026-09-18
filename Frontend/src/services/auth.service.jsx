import axios from "axios";

const API_URL = import.meta.env.SERVER_URL || "http://localhost:5000/api/v1";

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
                params: {token, tokenId, email,},
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Email Verification Error:", error.response?.data || error.message
        );

        throw error;
    }
};