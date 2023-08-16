import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserManager from '../../persistence/daos/mongodb/managers/user.manager.js';
import config from '../../../config.js';


const userManager = new UserManager ();

const strategyOptions = {
    clientID: config.GIT_ID,
    clientSecret: config.GIT_SECRET,
    callbackURL: config.GIT_URL
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    console.log('profile:::', profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userManager.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userManager.registro ({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1] + ' ' + profile._json.name.split(' ')[2],
        email,
        password: ' ',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));