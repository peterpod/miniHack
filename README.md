# miniHack
Creating a web app for companies to advertise themselves.

NOTE: The simple search feature requires that this text index exists in mongo, so connect to the test database and enter:

*db.attractions.createIndex({title: "text",description: "text" })*