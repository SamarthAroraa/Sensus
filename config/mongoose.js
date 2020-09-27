const env = require("./environment");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb://sensus:${env.db.password}@sensus-shard-00-00.tvb9n.mongodb.net:27017,sensus-shard-00-01.tvb9n.mongodb.net:27017,sensus-shard-00-02.tvb9n.mongodb.net:27017/sensus?ssl=true&replicaSet=atlas-ml4q6b-shard-0&authSource=admin&retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

//  mongoose.connect('mongodb://localhost:27017/sensus_database');
const db = mongoose.connection;

//unsuccessful connection
db.on(
  "error",
  console.error.bind(console, "Error establishing connection to the database")
);

//successful connection
db.once("open", function () {
  console.log("Connected to the Database::MongoDB");
});


module.exports = db;
