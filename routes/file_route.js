const express = require('express');
const passport = require('passport');
const router = express.Router();

const fileController = require('../controllers/file_controller');

/**
 * Customize auth message Protect the routes
 * and prevent copy paste of jwt token
 */
router.all('*', (req, res, next) => {
    console.log("body : ", req.body);
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = new Error('Unauthorised Access');
            error.status = 401;
            // The middleware will catch the error
            throw error;
        }
        req.user = user;
        // Get user object from every request when user is logged in
        return next();
    })(req, res, next); // Passport middleware
});

/**
 * Add Protected Routes under this comment
 */
router.post('/deleteFile', fileController.deleteFile);
router.get('/getFiles', fileController.getFiles);
router.post('/saveDownloadURL', fileController.saveDownloadURL);
router.post('/getFileAsString', fileController.getFileAsString);

module.exports = router;
