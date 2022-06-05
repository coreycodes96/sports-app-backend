import { transport } from "./config/index.js";

const forgotPasswordEmail = async (email: string, code: number): Promise<void> => {
    const mailOptions = {
        from: 'sports-app@outlook.com',
        to: email,
        subject: 'Forgot Password',
        html: `<h1>${code}</h1>`
    };

    try {
        const info = await transport.sendMail(mailOptions);
    } catch (error) {
        console.log('Error!', error);
    }
}

export default forgotPasswordEmail;