const AppError = require("../errors/error");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken')
const User = require('./../models/user')
const protect = catchAsync( async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token) {
        return next(new AppError('user is invlid, please log in first', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(decoded.id) 
    if(!currentUser) {
        return next(new AppError('There is no user with your cridentials', 401))
    }
    req.user = currentUser
    next()
})
module.exports = protect