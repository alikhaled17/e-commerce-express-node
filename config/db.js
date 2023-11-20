const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((error) => {
      console.warn(`Database Connection Error: ${error}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
