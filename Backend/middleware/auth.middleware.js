import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
     const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(400).json({
        message: "User not authanticated",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECERET_KEY);

    if (!decode) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error, "middleware problem auth");
  }
};

export { auth };
