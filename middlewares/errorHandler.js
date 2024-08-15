function ErrorHandler (err, req, res, next) {
    let statusCode = err.statusCode || 500;
    console.error(err)
    let message = 'Internal Server Error';

    if (err.name === 'INVALID_USERNAME') {
        statusCode = 401;
        message = 'Invalid email';
    } else if (err.name === 'INVALID_PASSWORD') {
        statusCode = 401;
        message = 'Invalid password';
    } else if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = err.errors.map(err => err.message)[0];
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        message = err.errors.map(err => err.message)[0]
    } else if (err.name === 'PASSWORDS_DO_NOT_MATCH') {
        statusCode = 400;
        message = 'Passwords do not match';
    } else if (err.name === 'NO_CREDENTIALS') {
        statusCode = 403;
        message = 'No credentials provided';
    } else if (err.name === 'UNAUTHORIZED') {
        statusCode = 403;
        message = 'User is not authorized to perform this action';
    } else if (err.name === 'USER_BANNED') {
        statusCode = 403;
        message = 'User is currently banned';
    } else if (err.name === 'USER_NOT_FOUND') {
        statusCode = 404;
        message = 'User not found';
    } else if (err.name === 'POST_NOT_FOUND') {
        statusCode = 404;
        message = 'Post not found';
    } else if (err.name === 'COMMENT_NOT_FOUND') {
        statusCode = 404;
        message = 'Comment not found';
    }

    res.status(statusCode).json({message: message});
}

module.exports = ErrorHandler;