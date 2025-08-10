const {validationResult} = require('express-validator')


module.exports = (req, res, next) => {
    const results = validationResult(req)
    if(!results.isEmpty())
        res.status(400).json({
            message: "fail",
            errors: results.array()
        })
    next()
}

