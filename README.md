# ISD Group 5

<p align="center">
    <a href="https://github.com/JacobKrueger42/ISDGroup5/blob/master/README.md">
        <img src="https://badges.aleen42.com/src/react.svg" alt="built with React" />
    </a>
    <a href="https://github.com/JacobKrueger42/ISDGroup5/blob/master/README.md">
        <img src="https://badges.aleen42.com/src/vitejs.svg" alt="built with ViteJs" />
    </a>
</p>

> Some example text

## Quick start

> This project uses `npm` to manage dependencies and run scripts. Ensure you have a recent version installed (`9.5.x+`). npm is a dependency of [NodeJs](https://nodejs.org/en/download).

To quickstart the frontend project,

```sh
cd frontend
npm ci
npm run dev
```

This will host the frontend on <http://localhost:5173> by default.

```sh
cd backend
npm ci
```

Go ahead and copy `example.env`, then rename it to `.env`. This should be grayed as Git ignores it. This is where we add environment variables or secrets. In a console, run the following to bootstrap the database and create a sqlite file,

```sh
npm run migrate
```

With the dependencies, environment, and database setup you can now run the API server.

```sh
npm run dev
```

This will boot the API server on <http://localhost:8181> by default. You should see a
successful startup with some messages telling you what controllers have been discovered.
Shutdown the server, and let's setup the database quickly.

You can test the API is running with these test endpoints (no auth required),

```sh
curl http://localhost:8181/counter/count
curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d  "{\"count\": 2}" http://localhost:8181/counter/fake-id/update
curl http://localhost:8181/counter/count
```

## Adding a controller

### What is this?

Controllers are functions that handle a specific route (partial URL) and HTTP verb (GET, POST, etc.). These handler functions,

- take the current request and response as params (`req`, `res` respectively).
- always complete the request by calling `res.send(someResponseData)` OR calling `next` ([more here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#route_functions))

### Adding a new one

1. Within the `/backend/src/controllers` directory, add a new folder with the name of the entity you want to control (eg. 'User'). This should be singular, not plural.
2. Create an `index.js` within this directory.
3. import the prisma client and any other services you may need

```js
import { prisma } from '#services';
```

4. add your various methods, these should be one of `[ list, count, create, detail, update, remove ]`

```js
export async function list(req, res) {
	// add your logic here!
	res.send('OK');
}
```

Checkout the `Counter/index.js` controller as a fully implemented example.

## Team Members

- Jacob Krueger (24454973)
- Sam Logan (24489724)
- Afiz Mahmud (14272797)
- Albert Ferguson (13611165)
