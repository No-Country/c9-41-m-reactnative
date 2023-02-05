import passport from "passport";
import User from "../db/models/user.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import GoogleStrategy from "passport-google-oauth20";

const { SECRETO_JWT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// Logeo con Token
passport.use(
  new JwtStrategy(
    {
      secretOrKey: SECRETO_JWT,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    },
    async function (token, done) {
      try {
        return done(null, token.user);
      } catch (e) {
        done(e);
      }
    }
  )
);

// Logeo con google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const exist = await User.findOne({ email: profile._json.email });
        if (exist) {
          // // Para que se logee desde google solo si se registro en google
          // if (exist.createdIn !== "google") {
          //   return cb(null, false, {
          //     message: "Locally created account",
          //   });
          // }
          return cb(null, exist);
        } else {
          let user = await new User({
            email: profile._json.email,
            username: profile._json.email,
            name: profile._json?.given_name,
            lastname: profile._json?.family_name,
            verified: true,
            createdIn: "google",
          });
          await user.save();
          return cb(null, user);
        }
      } catch (e) {
        return cb(e);
      }
    }
  )
);
