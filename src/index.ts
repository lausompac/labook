import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pingRouter } from './router/pingRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server started on port ${process.env.PORT || 3003}`);
})

app.use("/ping", pingRouter);