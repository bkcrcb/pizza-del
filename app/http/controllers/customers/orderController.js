const Order = require('../../../models/order')
const moment = require('moment')
function orderController () {
    return {
        store(req, res) {
            const { phone, address} = req.body
            if(phone=='' ||   address=='') {
                return res.status(422).json({ message : 'All fields are required' });
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                total_cost:req.session.cart.totalPrice ,
                phone,
                address,
            })
            order.save().then(result=> {
                req.flash('success',"order placed successfully")
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch((err) => {
                req.flash('error',"something went wrong")
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
             const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } } )
            // res.header('Cache-Control', 'no-store')
            
            
            res.render('customers/orders', { orders: orders,moment: moment})
            
             
        }
    }
}

module.exports = orderController