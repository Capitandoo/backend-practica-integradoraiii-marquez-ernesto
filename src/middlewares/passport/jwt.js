import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserManager from "../../persistence/daos/mongodb/managers/user.manager.js";
import config from "../../../config.js";
import { logger } from "../../utils/logger.js";

const userManager = new UserManager();

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

/* ------------------------------------ - ----------------------------------- */
// extraer token desde cookies
const cookieExtractor = (req) => {
  const token = req.cookies.token;
  return token;
};

const strategyOptionsCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: config.JWT_SECRET,
};
/* ------------------------------------ - ----------------------------------- */

const verifyToken = async (jwt_payload, done) => {
  logger.info("payload--->", jwt_payload);
  const user = await userManager.getById(jwt_payload.userId);
  if (!user) return done(null, false);
  return done(null, jwt_payload);
};

// req.user = jwt_payload

passport.use("jwt", new jwtStrategy(strategyOptions, verifyToken));
passport.use("jwtCookies", new jwtStrategy(strategyOptionsCookies, verifyToken)
);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getById(id);
  return done(null, user);
});
