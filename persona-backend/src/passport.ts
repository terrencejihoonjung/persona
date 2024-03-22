import { Request } from "express";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import User from "./models/User.ts";

interface JwtPayload {
  id: string;
}

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const options: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET as string,
};

const jwtStrategy = new JwtStrategy(
  options,
  async (jwt_payload: JwtPayload, done) => {
    try {
      const user = await User.findById(jwt_payload.id).exec();
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.error(error);
      return done(error, false);
    }
  }
);

const configurePassport = (passport: PassportStatic): void => {
  passport.use(jwtStrategy);
};

export default configurePassport;
