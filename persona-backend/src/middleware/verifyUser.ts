import { Request, Response, NextFunction } from "express";
import passport from "passport";

interface IUser extends Express.User {
  _id: string;
  username: string;
  email: string;
}

function verifyUser(req: Request, res: Response, next: NextFunction) {
  console.log("hi");
  passport.authenticate(
    "jwt",
    { session: false },
    (
      err: Error | null,
      user: IUser | false,
      info: { message: string } | undefined
    ) => {
      console.log("Auth Callback - Error:", err);
      console.log("Auth Callback - User:", user);
      console.log("Auth Callback - Info:", info);

      if (err) {
        return res.status(400).json({
          message: "Something went wrong validating the user token",
          err,
        });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid Token or Token Expired", info });
      }
      console.log("hi");
      req.user = user;
      return next();
    }
  );
}

export default verifyUser;
