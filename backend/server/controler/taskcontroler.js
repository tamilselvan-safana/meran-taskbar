import Task from '../model/taskmodel.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task' });
  }
};

export const createTask = async (req, res) => {
  const { title, description, to_completed, is_completed } = req.body;
  try {
    const newTask = new Task({ title, description, to_completed, is_completed });
    await newTask.save();
    res.status(201).json({ newTask, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, to_completed, is_completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, to_completed, is_completed },
      { new: true }
    );
    res.status(200).json({ updatedTask, message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send(`Task with id ${req.params.id} deleted`);
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
