//import moggose to use it 
const mongoose = require('mongoose');

//taking our IRI and adding it to the mongoose connection
mongoose.connect(process.env.DATABASE_URL);

//we are saving our db connection to a var for easy use
const db = mongoose.connection;

// db.on - event lsitener. 'on' something do something
// 'connected' - the event 
// callback function - console loggins the connection
db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
