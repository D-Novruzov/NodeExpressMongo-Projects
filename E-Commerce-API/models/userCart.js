const mongoose = require('mongoose')


const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ]
})
module.exports = mongoose.model('Cart', CartSchema)