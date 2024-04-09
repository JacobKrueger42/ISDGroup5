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

    opts.verbose &&
        console.log(`  discovered ${controllers.length} controllers`);
    if (controllers.length === 0) return;

    const rootDir = path.resolve('.');
    opts.verbose && console.log(`   root directory found at ${rootDir}`);

    await Promise.all(
        controllers.map(name => ConfigureController(name, app, rootDir, opts))
    );
}

async function ConfigureController(name, app, rootDir, opts) {
    // import has different relative directory than fs
    const controllerDir = path.join(
        rootDir,
        controllerDirectory,
        name,
        'index.js'
    );

    try {
        // add file prefix to fix windows usages
        const controller = await import(`file:///${controllerDir}`);

        if (name === 'Auth') {
            GenerateAuthRoutes(controller, name, app, opts);
        } else {
            GenerateRoutes(controller, name, app, opts);
        }
    } catch (error) {
        console.log(
            `an error occured while importing controller "${name ?? '<Unknown>'}" at path "${
                controllerDir ?? '<Unknown>'
            }",\n\t`,
            error
        );
    }
}

function GenerateAuthRoutes(controller, name, app, opts) {
    opts.verbose && console.log('\n   %s:', name);

    const methods = Object.keys(controller);
    const formattedName = name.toLowerCase();

    methods.forEach(method => {
        const routeConfig =
            {
                signup: ['post', '/auth/signup'],
                login: ['post', '/auth/login'],
                logout: ['post', '/auth/logout'],
                resetPassword: ['post', '/auth/reset-password']
            }[method] ?? null;

        if (!routeConfig)
            throw new Error(`unrecognized route: ${formattedName}.${method}`);
        const [httpAction, route] = routeConfig;

        // setup
        const handler = controller[method];

        app[httpAction](route, handler);
        opts.verbose &&
            console.log(
                `    ${httpAction.toUpperCase()} ${route} -> ${formattedName}.${method}`
            );
    });
}

function GenerateRoutes(controller, name, app, opts) {
    opts.verbose && console.log('\n   %s:', name);

    const methods = Object.keys(controller);
    const formattedName = name.toLowerCase();

    methods.forEach(method => {
        const routeConfig =
            {
                list: ['get', `/${formattedName}/list`],
                count: ['get', `/${formattedName}/count`],
                detail: ['get', `/${formattedName}/:id/detail`],
                get: ['get', `/${formattedName}`],
                create: ['post', `/${formattedName}/create`],
                update: ['post', `/${formattedName}/:id/update`],
                remove: ['delete', `/${formattedName}/:id/remove`]
            }[method] ?? null;

        if (!routeConfig)
            throw new Error(`unrecognized route: ${formattedName}.${method}`);

        const [httpAction, path] = routeConfig;

        // setup handler
        const handler = controller[method];

        // register the routes
        app[httpAction](path, handler);
        opts.verbose &&
            console.log(
                `    ${httpAction.toUpperCase()} ${path} -> ${formattedName}.${method}`
            );
    });
}
