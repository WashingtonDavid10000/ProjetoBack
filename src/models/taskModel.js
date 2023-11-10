import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  nome: { type: String },
  text: { type: String, required: true },
});

const tasksSchema = new Schema({
  email: { type: String, required: true, unique: true },
  tasks: [taskSchema],
});

const tasksModel = mongoose.model('tasks', tasksSchema);

class TaskModel {
  constructor() {
    this.errors = [];
  }

  async tasksExists(email) {
    const tasks = await tasksModel.findOne({ email });
    return tasks;
  }

  // async taskExist(){
  // }

  async getTasks(email) {
    this.errros = [];
    const tasks = await this.tasksExists(email);

    if (!tasks) {
      this.errors.push('Nenhuma tarefa foi criada');
      throw this.errors;
    }

    return tasks;
  }

  async registerTask(email, newTask) {
    this.errors = [];
    // Tasks(OBJ) com email e tasks
    const tasksUser = await this.tasksExists(email);
    // O array de Tasks
    const tasks = [...tasksUser.tasks];

    if (!tasksUser) {
      const tasksCriadas = await tasksModel.create({ email, tasks: newTask });
      return tasksCriadas;
    }

    const found = tasks.find((task) => task.nome === newTask.nome);

    if (found) {
      this.errors.push("Já existe uma tarefa registrada com o mesmo nome");
      throw this.errors;
    }

    tasks.push(newTask);

    const tasksCriadas = await tasksModel.findOneAndUpdate({ email }, { tasks }, { new: true });
    return tasksCriadas;
  }

  async updadeTask(email, { oldTask, newTask }) {
    this.errros = [];

    // Tasks(OBJ) com email e tasks
    const tasksUser = await this.tasksExists(email);

    // O array de Tasks
    const tasks = [...tasksUser.tasks];

    if (!tasksUser) {
      this.errors.push("Não há tarefas criadas");
      throw this.errors;
    }

    let found = null;

    tasks.forEach((task, i) => {
      if (task.nome === oldTask.nome) {
        found = i;
        return;
      }
    });

    if (found === null) {
      this.errors.push("Tarefa inexistente");
      throw this.errors;
    }

    tasks[found] = newTask;

    const tasksCriadas = await tasksModel.findOneAndUpdate({ email }, { tasks }, { new: true });
    return tasksCriadas;
  }

  async deleteTask(email, { deleteTask }) {
    this.errros = [];

    // Tasks(OBJ) com email e tasks
    const tasksUser = await this.tasksExists(email);

    // O array de Tasks
    const tasks = [...tasksUser.tasks];

    if (!tasksUser) {
      this.errors.push("Não há tarefas criadas");
      throw this.errors;
    }

    let found = null;

    tasks.forEach((task, i) => {
      if (task.nome === deleteTask.nome) {
        found = i;
        return;
      }
    });

    if (found === null) {
      this.errors.push("Tarefa a ser deletada, não existe");
      throw this.errors;
    }

    const newTask = [...tasks.slice(0, found), ...tasks.slice(found + 1, tasks.length - 1)];

    const tasksCriadas = await tasksModel.findOneAndUpdate(
      { email },
      { tasks: newTask },
      { new: true },
    );
    return tasksCriadas;
  }
}

export default new TaskModel();
