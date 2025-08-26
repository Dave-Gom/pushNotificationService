import { Router } from 'express';
import { readdirSync } from 'fs';
import { cleanFileName } from '../utils/helpers';

export const loadRoutes = async () => {
    const router = Router();
    const PATH_ROUTER = `${__dirname}`;

    readdirSync(PATH_ROUTER).filter(filename => {
        const cleanName = cleanFileName(filename);
        if (cleanName !== 'index') {
            import(`./${cleanName}`).then(moduleRouter => {
                router.use(`/${cleanName}`, moduleRouter.router);
            });
        }
    });

    return router;
};
