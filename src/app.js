import express from "express";
import "./database/index";
import dotenv from "dotenv";
// import cors from "cors";
// import helmet from "helmet";
import homeRouter from "./routes/homeRouter";
import loginRouter from "./routes/loginRouter";
import registerRouter from "./routes/registerRouter";
import taskRouter from "./routes/taskRouter";

dotenv.config();

const app = express();

// const whiteList = [
//   'http://localhost:3000',
//   'https://lista-de-tarefas-back.vercel.app/',
// ];

// const corsOptions = {
//   async origin(origin, callback) {
//     if (whiteList.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not alloweb by CORS"));
//     }
//   },
// };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors(corsOptions));
// app.use(helmet());

// Rotas
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/tasks', taskRouter);

export default app;
