exports.errorHandler = (err, req, res, next) {
    res.status(500).json({
        status: "failed",
        message: 'please try again'
    })
}