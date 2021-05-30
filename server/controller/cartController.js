const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.AddToCart = (req, res, next) => {
    let data ={
        item: req.body,
        qty:1
    }
    if(!req.session.cart){
        req.session.cart={
            items:[],
            totalQty:0,
            totalPrise:0
        }
    }

    let cart = req.session.cart;
    let dub_data = cart.items.find(e=> e.item._id === req.body._id)

    if(dub_data){
        dub_data.qty = dub_data.qty + 1;
        cart.totalPrise = cart.totalPrise + req.body.p_price;
    }else{
        cart.items.push(data);
        cart.totalQty = cart.totalQty+1;
        cart.totalPrise = cart.totalPrise + req.body.p_price;
    }

    res.send(cart);
}


exports.GetFormCart = (req, res, next) => {
    res.send(req.session.cart);
}

exports.UpdateCart = (req, res, next) => {
    let id = req.params.id;
    let cart = req.session.cart;

    
    let dub_data = cart.items.find(e=> e.item._id === id)
    if(dub_data){
        dub_data.qty = req.body.val;
        cart.totalPrise = cart.totalPrise + req.body.p_price;
    }

    res.send(cart);
}

exports.RemoveFromCart = (req, res, next) => {
    let index = req.params.index;
    let cart = req.session.cart;


    cart.totalPrise = cart.totalPrise - (cart.items[index].item.p_price * cart.items[index].qty);
    cart.items.splice(index , 1);
    cart.totalQty = cart.totalQty -1;

    res.send(cart);
}

 
exports.PaymentMethod = (req , res, next) =>{
    const {price , token} = req.body;

    return stripe.customers.create({
        email: token.email,
        source : token.id
    })
    .then(customer =>{
        stripe.charges.create({
            ammount : price,
            curency : 'USA',
            customer : customer.id,
            receipt_email: token.email,
            shipping:{
                name: token.card.name,
                address:{
                    country : token.card.address_country
                }
            }
        })
    })
    .then(result =>{
        res.send(result)
    })
    .catch(err => {
        console.log(err)
    })
}


