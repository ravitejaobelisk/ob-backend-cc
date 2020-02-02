# OB Backend CC

---

Node.js application to render list of posts and post details.

## Version

---

Version 1.0

## Dependencies

---

- [Express.js](http://expressjs.com/) - Web application framework built on Node.js

## Installation

---

Clone the git repository using https or ssh.

```
$ git clone https://github.com/ravitejaobelisk/ob-backend-cc.git
$ cd ob-backend-cc
$ npm install
```

### System Requirements

- Node.js > 12.14
- PostgresSQL - Installing PostreSQL on [Linux](http://www.postgresql.org/download/linux/)

## Usage: Local environment

---

Running the below command starts the application in development environment.

```
$ npm start
```

To populate the database with data from JSON Server.

```
$ npm run populateDB
```

This command will flush all the data in database and sync with new content.

## Documentation

---

Documentation can be generated by using 'JSDocs'.

```
$ npm run generatedoc
```

Open documentation/index.html in any browser to see the documentation
