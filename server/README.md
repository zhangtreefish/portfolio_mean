This is a server of mongodDB and mongoose for the portfolio_MEAN app, built in the
fashion of the MEAN course on EdX.
## To Run Server

1. Register the app at facebook and update `config.json` with clientID and clientSecret.
2. At server directory: Set node to the latest version and npm to match; Run `npm install`;
3. start a mongodb, go to step 4 or 5.
4. At server directory: Run `npm run testdb`, `npm run testauth`, and `npm run testapi` to see all tests pass.
5. At server directory: Run `node index.js` to start the Express/Mongoose server; go to step 6.
6. Open "http://localhost:3000/auth/facebook" to authenticate at Facebook. Go to
   "http://localhost:3000/api/v1/me" to verify successful authentication; go to step 7.
7. Verify api using curl, such as `curl http://localhost:3000/api/v1/project/id/1`.

##References:
1. https://evanhahn.com/express-dot-static-deep-dive/


