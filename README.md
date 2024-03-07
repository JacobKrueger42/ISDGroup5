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
npm install
npm run dev
```

This will host the frontend on <http://localhost:5173> by default.

```sh
cd backend
npm install
npm run dev
```

This will boot the API server on <http://localhost:8181> by default. Go ahead and give
it a test by running these commands,

```sh
curl http://localhost:8181/counter/count
curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"count": 2}' http://localhost:8181/counter/fake-id/update
curl http://localhost:8181/counter/count
```

## Team Members

- Jacob Krueger (24454973)
- Sam Logan (24489724)
- Afiz Mahmud (14272797)
- Albert Ferguson (13611165)
