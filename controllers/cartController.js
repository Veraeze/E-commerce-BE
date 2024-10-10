import userModel from "../models/userModel.js"

// add products to cart
const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
            
        }else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Added to cart"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}


// update cart
const updateCart = async (req, res) => {
    
}


// get cart data
const getCart = async (req, res) => {
    
}

export {addToCart, updateCart, getCart}