I copied files from Chap4.7-examples of the MEAN course at EdX, and modified it to serve
 as my portfolio front-end.

##How to develop this Single-Page_App:

Git clone the application repository;

Git checkout from master branch to a dev branch;

At `portfolio` directory: Set node version to 0.12 and npm to match;
```npm install```

At `portfolio` directory: Start browserify with gulp:
```gulp```

At `server` directory: Start the server:
```cd server```
```node index.js```
Go to `http://localhost:3000/auth/facebook` to authenticate, then:
go to `http://localhost:3000/portfolio/#/project/<_id>` to view a detailed project;
Make changes to .js code and watch the pages change.

##How to Unit Test
```sh
./node_modules/karma/bin/karma start ./karma.local.conf.js
```
##References:
[live templates](https://github.com/stefanKuijers/live-templates/blob/master/live-templates.js)
[failure in page refresh after load](https://stackoverflow.com/questions/21699271/angular-page-doesnt-refresh-after-data-is-added-or-removed)