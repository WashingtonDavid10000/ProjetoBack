import express from "express";
import "./database/index";
import dotenv from "dotenv";
import homeRouter from "./routes/homeRouter";
import loginRouter from "./routes/loginRouter";
import registerRouter from "./routes/registerRouter";
import taskRouter from "./routes/taskRouter";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/tasks', taskRouter);

export default app;
