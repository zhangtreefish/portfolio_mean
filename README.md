A Portfolio project based on the MEAN course on EdX.
There are two Mongoose Models for the database: User and Projects. User contains a
portfolio of projects. At the landing page you are welcome to my web developemnt
projects portfolio.

## To Develop the Application With Heroku

1. Go to the root directory(where package.json and this README.md are):
```sh
git checkout deploy_heroku
heroku local
```
2. Go to http://localhost:3003/api/v1/<route> to see the various APIs defined in
server/api.js, for example http://localhost:3003/api/v1/projects; Optionally, verify the
APIs using curl, such as `curl http://localhost:3003/api/v1/project/<_id>`.

3. To authenticate: Open "http://localhost:3003/auth/facebook" to authenticate at
Facebook, then go to "http://localhost:3003/api/v1/me" to verify successful
authentication;

4. To view the front-end, after starting the server, go to
http://localhost:3003/portfolio/#/ and other views defined in portfolio/index.js; set Network/Disable Cache at Chrome DevTools, make changes to code and observe the changes;

5. To deploy a new version of the app:
```sh
git push heroku deploy_heroku:master
```
To view the deployed adpp, go to https://portfolio-mean.herokuapp.com/portfolio

## To Run Functional Testing

All at a separate terminal, at the project root directory:

1. Start a standalone-selenium server by:
```sh
npm run selser start
```
2. Start the application server if testing the local application:
```sh
heroku local
```
3. Start the test:
```sh
./node_modules/.bin/wdio wdio.mocha.conf.js
```
or
```sh
SERVER=prod npm test
npm test
```
