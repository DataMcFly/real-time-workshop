# real-time Workshop

A intro to building a real-time backend API using node.js, LevelDB, and Socket.io.  For presentation slides, check out the gh-pages branch.

## Challenges

### Challenge One: Routing

Using Node.js and the express.js module, build a simple node.js server which returns a single message.

### Challenge Two: Meet LevelDB

Using the LevelUP module, add two endpoints, one that receives data and one that sends data.

The receiving endpoint will save data in an Leveldb database and the sending endpoint will retrieve the requested data and send it back.

### Challenge Three: Socket.io

Use Socket.io to add real-time interaction between your Leveldb app and your client-side app.

Create two types of emitters: `set` and `get` which can be passed a key to either save data to or to retrieve.

Create two types of listeners: `value` and `added`, added will return any new data when it is added and value will return specified data, or can also be used to return all data.

### Challenge Four: Browserify

Install the browserify package from npm globally - `npm install -g browserify`. The file "client.js" contains node.js-style code that uses both core node and third party modules from npm.  Use the browserify command line utility to create a browser-ready version of `client.js` called `commandline.js`, which should reside in the "public" directory of the project.

You will also want to check out the npm module `browserify-middleware`.  This module works with express to always serve the most recent version of your browserified source, and includes source maps so you can view and debug individual files.  In `app.js`, figure out how to use browserify-middleware to serve up a file called `middleware.js` to the browser, which contains the browserified contents of `client.js`.
