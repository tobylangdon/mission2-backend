import express, { Express, Request, Response } from "express";
import cors from "cors";
import car from "./routes/carRecognition";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../../.env" });

const app: Express = express();

const port: number | string = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world - the server is working!");
});
app.use(car);

app.listen(port, () => {
    console.log("Listening on port", port);
});
