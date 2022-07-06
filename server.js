const app = require("./app");
const port = process.env.port;

// importing database
const { DbConnection } = require("./config/db");
DbConnection();

app.listen(port, () => {
  console.log(`Listening to the port:${port}`);
});
