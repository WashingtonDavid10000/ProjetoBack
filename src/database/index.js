import mongoose from "mongoose";

// Configurando as váriaveis de ambiente
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.CONNECTSTRING);
