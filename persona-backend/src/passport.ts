import { Request } from "express";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
  StrategyOptionsWithRequest,
} from "passport-google-oauth20";

import { PassportStatic } from "passport";
import {
  ACCESS_TOKEN_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./env.ts";
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
      return done(error as Error, false);
    }
  }
);

const googleOptions: StrategyOptionsWithRequest = {
  clientID: GOOGLE_CLIENT_ID as string,
  clientSecret: GOOGLE_CLIENT_SECRET as string,
  callbackURL: "https://localhost:3000/api/users/google/callback",
  passReqToCallback: true,
};

const googleStrategy = new GoogleStrategy(
  googleOptions,
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => {
    try {
      // Find user by Google ID
      let user = await User.findOne({ googleId: profile.id }).exec();

      if (!user) {
        // If the user doesn't exist, create a new user
        user = new User({
          email: profile.emails![0].value,
          username: profile.displayName,
          googleId: profile.id,
        });

        await user.save();
      }

      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error as Error, false);
    }
  }
);

const configurePassport = (passport: PassportStatic): void => {
  passport.use(jwtStrategy);
  passport.use(googleStrategy);
};

export default configurePassport;
