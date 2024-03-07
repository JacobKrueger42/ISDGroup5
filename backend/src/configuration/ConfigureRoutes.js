import fs from 'fs';
import path from 'path';

const controllerDirectory = './src/controllers';

// create the (path) routes for any controllers defined in #controllers
export default async function ConfigureRoutes(app, opts) {
	opts.verbose && console.log('  configuring controllers');

	const dir = path.join(controllerDirectory);
	const controllers = (fs.readdirSync(dir) || []).filter(name =>
		// only include directories
		// by convention controllers are a directory with a file defining actions, eg. MyController/index.js
		fs.statSync(path.join(dir, name)).isDirectory()
	);

	opts.verbose && console.log(`  discovered ${controllers.length} controllers`);
	if (controllers.length === 0) return;

	await Promise.all(controllers.map(name => ConfigureController(name, app, opts)));
}

async function ConfigureController(name, app, opts) {
	opts.verbose && console.log('\n   %s:', name);

	// import has different relative directory than fs
	const controllerDir = path.join('..', '..', controllerDirectory, name, 'index.js');

	try {
		const controller = await import(controllerDir);
		GenerateRoutes(controller, name, app, opts);
	} catch (error) {
		console.log(
			`an error occured while importing controller "${name ?? '<Unknown>'}" at path "${
				controllerDir ?? '<Unknown>'
			}",\n\t`,
			error
		);
	}
}

function GenerateRoutes(controller, name, app, opts) {
	const methods = Object.keys(controller);

	methods.forEach(method => {
		const routeConfig =
			{
				list: ['get', `/${name}/list`],
				count: ['get', `/${name}/count`],
				create: ['post', `/${name}`],
				detail: ['get', `/${name}/:id`],
				update: ['post', `/${name}/:id/update`],
				delete: ['delete', `/${name}/:id`]
			}[method] ?? null;

		if (!routeConfig) throw new Error(`unrecognized route: ${name}.${method}`);
		const [httpAction, route] = routeConfig;

		// setup
		const handler = controller[method];

		app[httpAction](route, handler);
		opts.verbose && console.log(`    ${httpAction.toUpperCase()} ${route} -> ${name}.${method}`);
	});
}
