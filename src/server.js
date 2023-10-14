import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import connection from "./config/connectDB";

import bodyParser from "body-parser";



const app = express();

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection to DB
connection();

//config init web routes
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(">> running on port " + PORT);
});
