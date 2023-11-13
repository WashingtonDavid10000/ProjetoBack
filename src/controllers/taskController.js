import taskModel from "../models/taskModel";

export async function get(req, res) {
  try {
    const tasks = await taskModel.getTasks(req.userEmail);
    res.json(tasks);
  } catch (e) {
    res.status(401).json(e);
  }
}

export async function store(req, res) {
  try {
    const tasks = await taskModel.registerTask(req.userEmail, req.body);
    res.json(tasks);
  } catch (e) {
    res.status(401).json(e);
  }
}

export async function update(req, res) {
  try {
    const tasks = await taskModel.updadeTask(req.userEmail, {
      oldTask: req.body.oldTask,
      newTask: req.body.newTask,
    });
    res.json(tasks);
  } catch (e) {
    res.status(401).json(e);
  }
}

export async function remove(req, res) {
  try {
    const tasks = await taskModel.deleteTask(req.userEmail, { deleteTask: req.body.deleteTask });
    res.json(tasks);
  } catch (e) {
    res.status(401).json(e);
  }
}
