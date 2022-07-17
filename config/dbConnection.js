import { connect, set, connection } from 'mongoose';

// Set the path to the database

(async () => {
  try {
    await connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to mongo");
  }
  catch (e){
    console.log("connection error"); 
  }
})()



if (process.env.NODE_ENV === 'dev') {
  set('debug', true);
}

let db = connection;
let DB = (module.exports = db);
