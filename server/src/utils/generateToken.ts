import jwt from "jsonwebtoken";

import UserModelDocument from "../interfaces/UserModelDocument";

export default function (user: UserModelDocument) {
  const payload = { user };
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(payload, "process.env.JWT_SECRET", {
    algorithm: "HS256",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}