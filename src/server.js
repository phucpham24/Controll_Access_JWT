import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import connection from "./config/connectDB";
import initApiRoutes from "./routes/api";
import configCors from "./config/CORD";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8080;

//config CORS
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection to DB
connection();

//config init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(">> running on port " + PORT);
});
