import express from 'express';
import path from 'path';
import session from 'express-session';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import GithubStrategy from 'passport-github2';
import { graphiqlExpress } from 'graphql-server-express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './graphql/schema/';
import models from './models';

const app = express();
app.use(cookieParser());
// GET secret from untracked file
app.use(session({ 
  secret: 'keyboard cat pacifico',
  resave: false,
  saveUninitialized: true
}));
var corsOptions = {
  origin: 'http://kommandr.com:5000',
  credentials: true // <-- REQUIRED backend setting
};
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(cors(corsOptions));

passport.use(new GithubStrategy({
  clientID: 'f29206e1020352b03eb0',
  clientSecret: 'f6794e32694ed6e971a20f2e6b02557effff1d76',
  callbackURL: 'http://api.kommandr.com:5001/login/github/return'
  }, (accessToken, refreshToken, profile, done) => {
    const { id, displayName, username, emails, _json: { avatar_url } } = profile;
    const primaryEMail = emails[0].value;
    return models.User.findOrCreate({ 
      where: { email: primaryEMail },
      defaults: {
        name: displayName,
        username: username,
        isPasswordSet: 0,
        githubId: id,
        email: emails[0].value,
        externalAvatarUrl: avatar_url,
        status: 1
      }
    }).spread((user, created) => {
      return done(null, user.id);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  models.User.findById(user).then(user => {
    if (user) {
      done(null, user.get());
    } else {
      done(null, null);
    }
  })
});

app.use('/graphql', 
  bodyParser.json(), 
  graphqlHTTP((req, res) => ({
    schema
  }))
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://kommandr.com:5000/');
});
app.get('/login/github', passport.authenticate('github'));
app.get('/login/github/return',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://kommandr.com:5000/');
  }
);

app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;
