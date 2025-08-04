const AppError = require("../errors/error");
const catchAsync = require("../utils/catchAsync");

const restrictTo = (role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if(userRole === role) {
            
            next()
        }
        return new AppError('This route is forbidden, only admin can allow', 403)
    }
}
module.exports = restrictTo