const emailTemplate = ({
    fullName,
    title,
    message,
    buttonText,
    buttonLink,
    expiryMessage,
}) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            
            <h2>Hello ${fullName},</h2>

            <p>Welcome to DevConnect AI.</p>

            <h3>${title}</h3>

            <p>${message}</p>

            <a href="${buttonLink}"
                style="
                    display:inline-block;
                    padding:12px 24px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                "
            >
                ${buttonText}
            </a>

            <p style="margin-top:20px;">
                ${expiryMessage}
            </p>

            <p>
                If you didn't request this, you can safely ignore this email.
            </p>

        </div>
    `;
};

export default emailTemplate;