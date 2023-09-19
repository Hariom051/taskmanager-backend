import jwt from "jsonwebtoken";

export const tokengenerate = (payload: any) => {
  return jwt.sign(
    {
      data:payload
    },
    process.env.SECRET as string,
    { expiresIn: "1h" }
  );
};
