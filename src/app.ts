import express, { Request, Response } from "express";
import router from "./routers/router";

const app = express();
const PORT = 3000;

router(app);

app.listen(PORT, () => {
    console.log(`App is successfully running on:  http://localhost:${PORT}`);
})

