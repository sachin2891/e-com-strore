const router = require("express").Router();

const Cart = require("../models/Cart")
const { verifyToken, verifyTokenAndAuthorization
    , verifyTokenAndAdmin } = require("./verifyToken");




router.post("/", verifyToken, async (req, res) => {

    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err);
    }

});
// UPDATE Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //delete Cart

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        await Cart.findByIdAndDelete(
            req.params.id)
        res.status(200).json(Cart)

    } catch (error) {
        res.status(500).json(error)
    };

});
// Get User Cart
router.get("/find/:UserId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ UserId: req.params.UserId });

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get  all Cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {


    try {
        const carts = await Cart.find();
        res.status(500).json(carts)

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;