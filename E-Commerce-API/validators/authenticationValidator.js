const { body, param } = require('express-validator');

exports.validateSignUp = [
  body('name')
    .notEmpty().isString().isLength({ min: 3, max: 20 }).withMessage('name should be minimum 3 chars long'),
  body('email')
    .notEmpty().isEmail().withMessage('Email should be valid'),
  body('password')
    .notEmpty().isString().isLength({ min: 8 }).withMessage('password should not be lower than 8 chars'),
  body('passwordConfirm')
    .notEmpty().custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('passwords do not match');
      return true;
    }),
  body('role')
    .optional().isIn(['admin', 'user']).withMessage('Invalid role'),
];

exports.validateLogIn = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

exports.validateUpdatePassword = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  body('newPassword')
    .notEmpty().isString().isLength({ min: 8 }).withMessage('password should not be lower than 8 chars'),
  body('newPasswordConfirmation')
    .notEmpty().custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error('passwords do not match');
      return true;
    }),
];