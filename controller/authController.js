const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah username ada di database
    const user = await prisma.user.findFirst({
      where: { username: username },
    });

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid email or password!",
      });
    }

    // Bandingkan password dengan yang ada di database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid username or password!",
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      statusCode: 200,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, failed to login!",
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
