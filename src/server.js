import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express();

//config view engine
configViewEngine(app);

//config init web routes
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(">> running on port " + PORT);
});
