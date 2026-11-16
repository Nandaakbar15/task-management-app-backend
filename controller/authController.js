const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email and password are required!",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid email or password!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid email or password!",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully logged in!",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot login user!",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      statusCode: 200,
      message: "Logout successfully!",
    });
  } catch (error) {
    console.log("Error : ", error);
    res.status(404).json({
      statusCode: 404,
      message: "Could not logout!",
    });
  }
};
