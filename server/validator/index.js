const { check } = require('express-validator');
const UserModel = require('../models/user');

module.exports = {
    validateFirstName: check('firstName')
        .trim()
        .escape()
        .isLength({ min: 2, max: 20 })
        .withMessage('First name must be between 2 and 20 characters'),
    validateLastName: check('lastName')
        .trim()
        .escape()
        .isLength({ min: 2, max: 20 })
        .withMessage('Last name must be between 2 and 20 characters'),
    validateEmail: check('email')
        .trim()
        .escape()
        .isEmail()
        .withMessage('Email must be valid')
        .custom(async (email, { req }) => {
            const user = await UserModel.findOne({ email });
            if (user) {
                return Promise.reject('User with this email already exists');
            }
        }),
    validatePassword: check('password')
        .trim()
        .escape()
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters'),
    validateConfirmPassword: check('confirmPassword', 'Confirm password field must have the same value as the password field')
        .trim()
        .escape()
        .custom((confirmPassword, { req }) => confirmPassword === req.body.password),
};
