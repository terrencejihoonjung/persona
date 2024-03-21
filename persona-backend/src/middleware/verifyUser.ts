import { Request, Response, NextFunction } from "express";
import passport from "passport";

interface IUser extends Express.User {
  _id: string;
  username: string;
  email: string;
}

function verifyUser(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "jwt",
    { session: false },
    (
      err: Error | null,
      user: IUser | false,
      info: { message: string } | undefined
    ) => {
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
      next();
    }
  );
}

export default verifyUser;
