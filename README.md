A Portfolio project based on the MEAN course on EdX.
There are two Mongoose Models for the database: User and Projects. User contains a
portfolio of projects. At the landing page you are welcome to my web developemnt
projects portfolio.

## To Run the Application Locally

1. Register the app at facebook and update `config.json` with clientID and clientSecret.

2. Go to the root directory(where package.json and this README.md are):
- Have the latest node version and matching npm;
- Run `npm install`;
- Run `npm run testdb`, `npm run testauth`, `npm run testapi`;

3. start a mongodb;

4. Run `npm run start` or `node server/index.js` to start the  Express/Mongoose server;
go to steps 5, 6, or 7.

5. Go to http://localhost:3000/api/v1/<route> to see the various APIs defined in
server/api.js, for example http://localhost:3000/api/v1/projects; Optionally, verify the
APIs using curl, such as `curl http://localhost:3000/api/v1/project/<_id>`.

6. To authenticate: Open "http://localhost:3000/auth/facebook" to authenticate at
Facebook, then go to "http://localhost:3000/api/v1/me" to verify successful
authentication;

7. To view the front-end, after starting the server, go to
http://localhost:3000/portfolio/#/ and other views defined in portfolio/index.js.

## To view the deployed adpp, go to https://portfolio-mean.herokuapp.com/portfolio

##References:
1. `__dirname`: where executing script resides; `.`: where node command is issued. http://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js#
