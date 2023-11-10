import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  nome: {
    type: String, minLength: 3, maxLength: 255,
  },
  email: { type: String, unique: true },
  password: { type: String },
});

const userModel = mongoose.model('users', userSchema);

class UserModel {
  constructor() {
    this.errors = [];
  }

  // eslint-disable-next-line class-methods-use-this
  async getAll() {
    const data = await userModel.find();
    return data;
  }

  async getUser(email) {
    const data = await userModel.findOne({ email });
    return data;
  }

  async login(data) {
    this.validaLogin(data);

    if (this.errors.length > 0) {
      throw this.errors;
    }

    const user = await userModel.findOne({ email: data.email });
    if (!user) {
      this.errors.push("Informações inválidas");
      throw this.errors;
    }

    const passwordValid = await this.passwordIsValid(data.password, user.password);

    if (!passwordValid) {
      this.errors.push("Informações inválidas");
      throw this.errors;
    }

    const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return token;
  }

  async register(data) {
    this.errors = [];

    await this.validaRegister(data);

    if (this.errors.length > 0) {
      throw this.errors;
    }

    if (await this.userExists(data.email)) {
      this.errors.push('Usuário com e-mail já cadastrado');
    }

    if (this.errors.length > 0) {
      throw this.errors;
    }

    const password = await bcryptjs.hashSync(data.password, 8);
    const user = await userModel.create({ nome: data.nome, email: data.email, password });

    return user.nome;
  }

  passwordIsValid(password, passwordHash) {
    return bcryptjs.compare(password, passwordHash);
  }

  validaLogin(data) {
    if (!data.email || !validator.isEmail(data.email)) {
      this.errors.push("Email ou senha inválido");
    }

    if (!data.password || (data.password.length < 6 || data.password.length > 50)) {
      this.errors.push("Email ou senha inválido");
    }
  }

  async userExists(data) {
    const user = await userModel.findOne({ email: data });
    return user;
  }

  validaRegister(data) {
    if (data.nome.length < 3 || data.nome.length > 255) {
      this.errors.push("Nome precisa ter entre 3 e 255 caracteres");
    }

    if (!validator.isEmail(data.email)) {
      this.errors.push("Email inválido");
    }

    if (data.password.length < 6 || data.password.length > 50) {
      this.errors.push("Senha precisa ter entre 6 e 50 caracteres");
    }
  }
}

export default new UserModel();
