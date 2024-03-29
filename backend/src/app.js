import express from 'express';
import { ErrorHandler } from '#middleware';
import { ConfigureRoutes } from '#configuration';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import cors from 'cors';

const opts = {
    port: 8181,
    verbose: true,
    frontendOrigin: 'http://localhost:5173'
};

async function Setup() {
    const app = express();

    // configure pre-request middleware
    app.use(
        cors({
            origin: opts.frontendOrigin
        })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(
        session({
            // ideally this should be loaded from an env var/secret file
            secret: 'asupersecretkey',
            resave: false,
            saveUninitialized: true,
            genid: crypto.randomUUID,
            cookie: { secure: true }
        })
    );

    // configure routes automatically
    await ConfigureRoutes(app, { verbose: opts });

    // configure post-request middleware
    app.use(ErrorHandler);

    return app;
}

Setup().then(app => {
    // startup
    app.listen(opts.port, () => {
        console.log('\n  ExpressJs server is now running\n');
        console.log('    ➜ Hot loading not enabled');
        console.log(`    ➜ Local:		http://localhost:${opts.port}/`);
    });
});
