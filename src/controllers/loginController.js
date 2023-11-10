import userModel from "../models/userModel";

export default async function post(req, res) {
  try {
    const userToken = await userModel.login(req.body);

    res.json(userToken);
  } catch (e) {
    res.json(e);
  }
}
