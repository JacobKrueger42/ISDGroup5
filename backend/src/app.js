import express from 'express';
import { ErrorHandler } from '#middleware';
import { ConfigureRoutes } from '#configuration';
// import { get, post } from '#controllers';

const opts = {
	port: 8181,
	verbose: true
};

const app = express();

// apply configuration
ConfigureRoutes(app, { verbose: opts });

// configure middleware
app.use(ErrorHandler);

// configure controllers
// app.get('/total', get);
// app.post('/increment', post);

// startup
app.listen(opts.port, () => {
	console.log('  ExpressJs server is now running\n');
	console.log('    ➜ Hot loading not enabled');
	console.log(`    ➜ Local:		http://localhost:${opts.port}/`);
});
