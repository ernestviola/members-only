import { body, validationResult, matchedData } from 'express-validator';

const indexController = {};

const validateUserSignUp = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty.")
    .isLength({ max: 100 })
    .withMessage('Username must be 100 characters or less.'),
  body('password')
    .isStrongPassword({ minLength: 8, minNumbers: 1, minSymbols: 1 })
    .withMessage(
      'Password must be at least 8 chracters long with 1 number and 1 symbol.',
    ),
  body('accessCode')
    .notEmpty()
    .equals('Best App Ever')
    .withMessage('Incorrect Access Code'),
];

indexController.get = (req, res) => {
  res.render('index');
};

indexController.getSignUp = (req, res) => {
  res.render('signUp');
};

indexController.postSignUp = [
  validateUserSignUp,
  (req, res) => {
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

      return res.render('signUp', {
        fieldErrors,
        formData: req.body,
      });
    }

    try {
      // try to create a new user with a password using bcrypt if username exists then throw an error
    } catch (error) {
      //
    }

    console.log(username, password, accessCode);
    res.render('signUp');
  },
];

export default indexController;
