import UserManager from "../../persistence/daos/mongodb/managers/user.manager.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { logger } from "../../utils/logger.js";

const userManager = new UserManager();

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
  try {
    const user = await userManager.getByEmail(email);
    if (user) return done(null, false);
    const newUser = await userManager.registro(req.body);
    return done(null, newUser);
  } catch (error) {
    logger.error(error);
    next(error.message);
  }
};

const login = async (req, email, password, done) => {
  const user = { email, password };
  const userLogin = await userManager.login(user);
  if (!userLogin) return done(null, false, {message: "Error de credencial"});
  return done(null, userLogin, {message: "Login exitoso!"});
};

const signupStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("register", signupStrategy);
passport.use("login", loginStrategy);

//registra al user en req.session.passport
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getById(id);
  return done(null, user);
});

export const frontResponseLogin = {
  failureRedirect: "/error-login",
  successRedirect: "/productos",
  passReqToCallback: true,
};

export const frontResponseRegister = {
  failureRedirect: "/error-registro",
  successRedirect: "/login",
  passReqToCallback: true,
};
