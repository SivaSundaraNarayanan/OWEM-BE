const app = require("express")();
const bodyParser = require("body-parser");
require("dotenv").config();
const routes = require("./route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
