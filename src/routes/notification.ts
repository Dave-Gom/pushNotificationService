import { Router } from 'express';

import { postNotification } from '../controllers/NotificationContoller';
import { checkSession } from '../middlewares/Session';

const router = Router();

router.post('/', checkSession, postNotification);

export { router };
