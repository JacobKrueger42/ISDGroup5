import express from 'express';
import { ErrorHandler } from '#middleware';
import { ConfigureRoutes } from '#configuration';

const opts = {
    port: 8181,
    verbose: true
};

async function Setup() {
    const app = express();

    // configure pre-request middleware
    app.use(express.json());

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
