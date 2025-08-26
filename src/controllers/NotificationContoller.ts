import { Request, Response } from 'express';
import { sendNotification } from '../services/Notification.service';
import { handleHttp } from '../utils/error.handler';

export const postNotification = async ({ body }: Request, res: Response) => {
    try {
        const result = await sendNotification(body.token, body.title, body.body, body.imageUrl);

        if (result) {
            res.send(result);
        } else {
            throw 'Notification not sent';
        }
    } catch (e) {
        handleHttp(res, `POST_NOTIFICATION_ERROR:: ${e}`);
    }
};
