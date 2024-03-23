import { Request } from "express";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { PassportStatic } from "passport";
import { ACCESS_TOKEN_SECRET } from "./env.ts";
import User from "./models/User.ts";

interface JwtPayload {
  id: string;
}

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["accessToken"];
  }
  return token;
};

const options: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: ACCESS_TOKEN_SECRET as string,
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
