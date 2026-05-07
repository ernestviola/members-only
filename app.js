import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import passport from './lib/config/passport.js';
import session from './lib/config/session.js';

import indexRouter from './routes/indexRouter.js';

// Initialize variables
const PORT = process.env.PORT || 3000;
const viewsPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'views',
);
const publicPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'public',
);

// Start express and configure
const app = express();
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Set middleware
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true })); // traditional html forms application/x-www-form-urlencoded
// app.use(express.json()); // api requests application/json

app.use(session); // express session with pg session configured
app.use(passport.session());
app.use(passport.initialize());

app.use((req, res, next) => {
  if (req.user) {
    res.locals.currentUser = req.user;
  }
  next();
}); // Automatically set currentUser for views

// Routes
app.use(indexRouter);

// Error handling

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`App listening on port ${PORT}`);
});
