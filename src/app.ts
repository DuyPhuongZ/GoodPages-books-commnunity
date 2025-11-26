import express, { Request, Response } from "express";
import router from "./routers/router";
import { json } from "stream/consumers";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(PORT, () => {
    console.log(`App is successfully running on:  http://localhost:${PORT}`);
})

