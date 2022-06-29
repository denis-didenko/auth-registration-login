const Router = require('express').Router;
const userController = require('../controllers/user');
const router = new Router();
const { validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validatePassword } = require('../validator/index');
const authMiddleware = require('../middlewares/auth');

router.post(
    '/register',
    [validateFirstName, validateLastName, validateEmail, validatePassword, validateConfirmPassword],
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refreshToken);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
