import { transport } from "./config/index";

const activateEmail = async (email: string, code: number): Promise<void> => {
    const mailOptions = {
        from: 'sports-app@outlook.com',
        to: email,
        subject: 'Activate Email',
        html: `<h1>${code}</h1>`
    };

    try {
        const info = await transport.sendMail(mailOptions);
    } catch (error) {
        console.log('Error!', error);
    }
}

export default activateEmail;