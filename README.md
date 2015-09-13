# miniHack
Creating a web app for companies to advertise themselves.

Public git repo: *https://github.com/peterpod/miniHack*

NOTE: To run the app, run `npm install` to install dependencies and `node app.js` to run the app. Note that **mongod** must also be running on its default port.

NOTE: The simple search feature requires that this text index exists in mongo, so connect to the test database and enter:

`db.attractions.createIndex({title: "text",description: "text" })`