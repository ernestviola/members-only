import { body, validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcryptjs';
import pool from '../lib/db/pool.js';
import passport from '../lib/config/passport.js';

const indexController = {};

const validateUserAuth = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty.")
    .isLength({ max: 100 })
    .withMessage('Username must be 100 characters or less.'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 0,
      minLowercase: 0,
    })
    .withMessage(
      'Password must be at least 8 characters long with 1 number and 1 symbol.',
    ),
];

const validateAccessCode = [
  body('accessCode')
    .notEmpty()
    .equals('Best App Ever')
    .withMessage('Incorrect Access Code'),
];

const validateMessage = [
  body('message')
    .notEmpty()
    .withMessage('A message must contain text.')
    .isLength({ max: 200 })
    .withMessage('Message must be less than 200 characters.'),
];

indexController.get = (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/board');
  return res.render('index');
};

indexController.getBoard = async (req, res, next) => {
  try {
    const q = `
      select ${req.user ? 'a.username,' : ''} m.message, m.added from message m
      inner join account a on m.account_id = a.id order by m.added desc
      `;
    const { rows } = await pool.query(q);

    return res.render('board', {
      messages: rows,
    });
  } catch (error) {
    return next(error);
  }
};

indexController.postMessage = [
  validateMessage,
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.redirect('/board');
    }
  },
  async (req, res, next) => {
    const errors = validationResult(req);
    const { message } = matchedData(req);
    if (!errors.isEmpty()) {
      const fieldErrors = {};
      errors.array().forEach((error) => {
        if (error.path) {
          fieldErrors[error.path] = error.msg;
        }

        return res.render('board', {
          fieldErrors,
          formData: req.body,
        });
      });
    }

    try {
      const { rows } = await pool.query(
        'insert into message (account_id,message) values ($1,$2)',
        [req.user.id, message],
      );
    } catch (error) {
      return next(error);
    }

    res.redirect('/board');
  },
];

indexController.getSignUp = (req, res) => {
  res.render('signUp');
};

indexController.postSignUp = [
  validateUserAuth,
  validateAccessCode,
  async (req, res, next) => {
    const errors = validationResult(req);
    const { username, password, accessCode } = matchedData(req);

    if (!errors.isEmpty()) {
      console.log(req.body);

      const fieldErrors = {};
      errors.array().forEach((error) => {
        if (error.path) {
          fieldErrors[error.path] = error.msg;
        }
      });

      return res.render('signUp', {
        fieldErrors,
        formData: req.body,
      });
    }

    try {
      // try to create a new user with a password using bcrypt if username exists then throw an error
      const hashedPassword = await bcrypt.hash(password, 10);
      const { rows } = await pool.query(
        'insert into account (username,password) values ($1,$2) returning *',
        [username, hashedPassword],
      );

      const user = rows[0];

      // login user
      return req.login(user, (error) => {
        if (error) return next(error);
        res.redirect('/board');
      });
    } catch (error) {
      // get username is unavailable error
      console.log(error);
      if (error.code === '23505') {
        return res.render('signUp', {
          fieldErrors: {
            username: 'Username already exists',
          },
          formData: req.body,
        });
      }

      return next(error);
    }
  },
];

indexController.getLogin = (req, res, next) => {
  res.render('login');
};

indexController.postLogin = [
  validateUserAuth,
  (req, res, next) => {
    const errors = validationResult(req);
    const { username, password, accessCode } = matchedData(req);

    if (!errors.isEmpty()) {
      console.log(req.body);

      const fieldErrors = {};
      errors.array().forEach((error) => {
        if (error.path) {
          fieldErrors[error.path] = error.msg;
        }
      });

      console.log(fieldErrors);

      return res.render('login', {
        fieldErrors,
        formData: req.body,
      });
    }

    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.render('login', {
          fieldErrors: {
            password: 'Incorrect Username or Password',
          },
          formData: req.body,
        });
      }

      req.login(user, (error) => {
        if (error) {
          next(error);
        }
        return res.redirect('/board');
      });
    })(req, res, next);
  },
];

indexController.logout = (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    res.redirect('/');
  });
};

export default indexController;
