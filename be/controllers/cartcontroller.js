import usermodel from "../models/usermodel.js";

const addtocart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await usermodel.findById(userId);

        // Initialize cartData if it doesn't exist
        const cartData = userData.cartData || {}; 

        // Check if itemId exists in cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment the quantity
            } else {
                cartData[itemId][size] = 1; // Initialize the size count
            }
        } else {
            cartData[itemId] = {}; // Initialize itemId in cartData
            cartData[itemId][size] = 1; // Set initial size count
        }

        await usermodel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updatetocart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await usermodel.findById(userId);

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {}; 

        // Check if itemId exists and update its size
        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            cartData[itemId][size] = quantity; // Update quantity
        }

        await usermodel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getusercart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await usermodel.findById(userId);

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {}; 

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addtocart, updatetocart, getusercart };
