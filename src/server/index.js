import express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import GithubStrategy from 'passport-github2';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './graphql/schema/';

const PORT = 3001;

const app = express();

passport.use(new GithubStrategy({
  clientID: 'f29206e1020352b03eb0',
  clientSecret: 'f6794e32694ed6e971a20f2e6b02557effff1d76',
  callbackURL: 'http://localhost:5000/login/github/return'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
    return cb(null, profile);
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// bodyParser is needed just for POST.
app.use('/graphql', 
  bodyParser.json(), 
  graphqlExpress({
    schema,
    rootValue: { x: 12 }
  })
);
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.get('/login/github', passport.authenticate('github'));
app.get('/login/github/return',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);
app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;
