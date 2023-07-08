import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

import User from "../models/user.model";
import BaseError from '../error/base-error';

const JWTStrategy = Strategy;

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: (req) => {
        // Return the JWT token string
        return req.cookies.jwt;
      },
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // Check if the user associated with token still exists
        const user = await User.findById(payload.user._id);
        if (!user)
          return done(
            new BaseError("User does not exists.", 401)
          );
        // Check if the password has been changed after token was issued
        const passwordModified = user.passwordModified(payload.iat);
        if (passwordModified)
          return done(
            new BaseError(
              "Invalid token! User changed password after this token was issued. Signin again to get a new token.",
              401
            )
          );
        // Grant access!
        done(null, payload.user);
      } catch (error) {
        done(error);
      }
    }
  )
);