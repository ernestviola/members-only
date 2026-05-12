import { body, validationResult, matchedData } from 'express-validator';

const indexController = {};

indexController.get = (req, res) => {
  res.render('index');
};

indexController.getSignUp = (req, res) => {
  res.render('signUp');
};

indexController.postSignUp = (req, res) => {};

export default indexController;
