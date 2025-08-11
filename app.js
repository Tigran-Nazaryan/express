import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from "./controllers/routes/index.js";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());
app.use("/api", router);

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
