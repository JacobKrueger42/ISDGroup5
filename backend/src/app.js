import express from 'express';
import { ErrorHandler } from '#middleware';
import { ConfigureRoutes } from '#configuration';
import session from 'express-session';
import crypto from 'crypto';
import cors from 'cors';
import { ServerOptions } from '#configuration';
import 'dotenv/config'; // init the process with dotenv variables
import OrderController from './controllers/OrderController';

async function Setup() {
    const app = express();

    // configure pre-request middleware
    app.use(
        cors({
            origin: ServerOptions.frontendOrigin,
            credentials: true
        })
    );
    app.use(express.json());
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            genid: crypto.randomUUID,
            cookie: { secure: false }
        })
    );

    // configure routes automatically
    await ConfigureRoutes(app, { verbose: ServerOptions.verbose });

    // Import and use order routes
    app.use('/api/orders', OrderController);

    // configure post-request middleware
    app.use(ErrorHandler);

    return app;
}

Setup().then(app => {
    // startup
    app.listen(ServerOptions.port, () => {
        console.log('\n  ExpressJs server is now running\n');
        console.log('    ➜ Hot loading not enabled');
        console.log(`    ➜ Local:		http://localhost:${ServerOptions.port}/`);
    });
});
