import express from "express";
import session from "express-session";
import mongoose from "mongoose";

import authenticationRouter from "./routes/auth/authentification-router.js";
import usersRouter from "./routes/controller/users-router.js";
import myAccountRouter from "./routes/controller/my-account-router.js";
import menusRouter from "./routes/controller/menus-router.js";
import restaurantsRouter from "./routes/controller/restaurants-router.js";

const app = express();
const MONGODB_URI = "mongodb://localhost:27017/trainstation";
const DBNAME =
  process.env.NODE_ENV === "test"
    ? "trainstation-test"
    : "trainstation";


//app
app.use(express.json());

app.use(session({
    secret: "secret"
}));

export default app;

//database
mongoose.connect(MONGODB_URI, {
    dbName: DBNAME,
});

mongoose.connection.on("error", (e) => {
    console.log("Erreur", e.toString());
});

mongoose.connection.on("connected", () => {
    console.log("Connection à MongoDB établi !");
});

app.use("/authentification", authenticationRouter);
app.use("/users", usersRouter);
app.use("/my_account", myAccountRouter);
app.use("/menus", menusRouter);
app.use("/restaurants", restaurantsRouter);
