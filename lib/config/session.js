import expressSession from 'express-session';
import pgSession from 'connect-pg-simple';
import pool from '../db/pool.js';

const pgStore = pgSession(expressSession);
const session = expressSession({
  store: new pgStore({
    pool: pool,
    tableName: 'session',
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
});

export default session;
