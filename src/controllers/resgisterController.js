import userModel from "../models/userModel";

export default async function post(req, res) {
  try {
    const user = await userModel.register(req.body);

    return res.status(200).json(`${user} Cadastrado`);
  } catch (e) {
    return res.status(400).json(e);
    // res.json({ errros: e.map((err) => err) });
  }
}
