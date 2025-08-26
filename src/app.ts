import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { serviceFirebasAccount } from './keys/padelsys-2200e-firebase-adminsdk-9lnh0-3a119295af';
import { loadRoutes } from './routes/index';

const main = async () => {
    try {
        const appFirebase = initializeApp({
            //@ts-ignore
            credential: credential.cert(serviceFirebasAccount),
        });
        const router = await loadRoutes();
        const PORT = process.env.PORT || 925;
        const app = express();
        app.use(
            express.urlencoded({
                extended: true,
            })
        );
        app.use(express.json());
        app.use(cors());

        app.use(router);

        app.listen(PORT, () => {
            console.log(`listo por el puerto ${PORT} xdd`);
        });
    } catch (error) {
        console.error('Ha ocurrido un error', error);
    }
};

main();
