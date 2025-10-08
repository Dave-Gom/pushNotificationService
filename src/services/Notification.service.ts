import { messaging } from 'firebase-admin';

export const sendNotification = async (
    token: string,
    title: string,
    body: string,
    imageUrl: string,
    deepLink: string
) => {
    try {
        const messagingOBj = messaging();
        const res = await messagingOBj.send({
            token,
            notification: {
                body,
                title,
                imageUrl,
            },
            data: {
                deepLink,
            },
        });

        if (res) {
            console.log(res);
            return true;
        } else {
            throw res;
        }
    } catch (error) {
        console.log(`error al enviar mensaje de firebase: ${error}`);
        return false;
    }
};
