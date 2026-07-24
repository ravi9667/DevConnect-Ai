const loginOtpTemplate = ({ fullName, otp }) => {
    return `
        <h2>Hello ${fullName}</h2>
        <p>Your Login OTP is</p>
        <h1>${otp}</h1>
        <h1>This OTP will expire in 10 minutes</h1>
    `;
};

export default loginOtpTemplate;