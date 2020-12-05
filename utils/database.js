const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://user:brodin@cluster0.mnbla.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// function to connect
const mongoConnect = (callback) => {
  client.connect((err) => {
    callback(client);
    client.close();
  });
};

//export connect funciton
module.exports = mongoConnect;
