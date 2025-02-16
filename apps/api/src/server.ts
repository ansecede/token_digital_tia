import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./endpoints";

export const createServer = (): Express => {
    const app = express();
    app.use(morgan("dev"))
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cors({ origin: ["http://localhost:3000"] }))
        .get("/", (_, res) => {
            return res.json({ hello: "world" });
        })
        .use(router);

    return app;
};
