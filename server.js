const app = require("./app");
const PORT = 3000;


//seperating out app and server to faciliate JEST testing
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});