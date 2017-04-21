A Portfolio project based on the MEAN course on EdX.
There are two Mongoose Models for the database: User and Projects. User contains a portfolio of projects. At the landing page you are welcome to my web developemnt projects portfolio.

## To Adpat the Server For Your Own

1. Register the app at facebook and update `config.json` with clientID and clientSecret.

2. Go to the root directory(where package.json and this README.md are):
- Have the latest node version and matching npm;
- Run `npm install`;
- Run `npm run testdb`, `npm run testauth`, `npm run testapi`;

3. start a mongodb;

4. Run `npm run start` or `node server/index.js` to start the  Express/Mongoose server;

5. Open "http://localhost:3000/auth/facebook" to authenticate at Facebook. Go to "http://localhost:3000/api/v1/me" to verify successful authentication;

6. Verify api using curl, such as `curl http://localhost:3000/api/v1/project/id/1`.

##References:
1. `__dirname`: where executing script resides; `.`: where node command is issued. http://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js#
