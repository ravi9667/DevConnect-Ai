const verifyEmailTemplate = ({ fullName, verificationLink }) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Hello ${fullName}</h2>
            <p>Welcome to DevConnect AI.</p>
            <p>Please verify your email by clicking the button below.</p>
            <a href="${verificationLink}" 
                style="display:inline-block; padding:12px 24px; background: #2563eb; 
                color: white; text-decoration:none; border-radius: 6px; "
                > 
                    Verify Email
            </a>
            <p style="margin-top: 20px;">This link will expire in 24 hours</p>
            <p>If you Didn't create this account, you can sefely ignore this email.</p>
        </div>
    `
};

export default verifyEmailTemplate;