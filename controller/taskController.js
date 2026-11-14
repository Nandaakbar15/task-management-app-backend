const prisma = require("../lib/prisma");

exports.getAllTaskData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const tasks = await prisma.task.findMany({
      skip: skip,
      take: limit,
    });

    const totalData = await prisma.task.count();

    return res.status(200).json({
      statusCode: 200,
      data: tasks,
      meta: {
        totalData: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: limit,
      },
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.getTasksById = async (req, res) => {
  try {
    const parsedId = parseInt(req.params.id);

    const tasks = await prisma.task.findUnique({
      where: { id: parsedId },
    });

    if (!tasks) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${parsedId} is not found!`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: tasks,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.createTasks = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    const tasksData = {
      title,
      description,
      category,
      status,
    };

    const addNewData = await prisma.task.create({
      data: tasksData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully add new data!",
      data: addNewData,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, failed to add new data!",
    });
  }
};

exports.updateTasks = async (req, res) => {
  try {
    const parsedId = parseInt(req.params.id);

    const { title, description, category, status } = req.body;

    const checkId = await prisma.task.findUnique({
      where: { id: parsedId },
    });

    if (!checkId) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${parsedId} is not found!`,
      });
    }

    const taskData = {
      title,
      description,
      category,
      status,
    };

    const updateTasks = await prisma.task.update({
      where: { id: parsedId },
      data: taskData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the tasks!",
      data: updateTasks,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot update the data!",
    });
  }
};

exports.deleteTasks = async (req, res) => {
  try {
    const parsedId = parseInt(req.params.id);

    const checkId = await prisma.task.findUnique({
      where: { id: parsedId },
    });

    if (!checkId) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${parsedId} is not found!`,
      });
    }

    await prisma.task.delete({
      where: { id: parsedId },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot delete the data!",
    });
  }
};
