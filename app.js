import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import {corsOptions} from "./config/corsOptions.js";
import startServer from "./utils/startServer.js";
import {errorHandler} from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler)

app.use("/api", router);

startServer(app, PORT);


