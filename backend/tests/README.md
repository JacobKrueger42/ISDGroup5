# Tests

This is a simple Jest config setup for a Node backend. Since we use modules, we're using
the experimental Node flag to support imports. This is brittle and may break on updates.

Tests will hit the sqlite db - so they're more integration style than unit - but we can do
so without running the ExpressJs server.

Run the test suite with,

```sh
npm run test
```
