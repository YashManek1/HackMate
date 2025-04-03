import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, "your_jwt_secret", { expiresIn: "7d" });
};
