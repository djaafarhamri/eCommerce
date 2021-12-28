const Product = require('../models/Product')

module.exports.addProduct = async (req, res) => {
    const { title, description, category, subCategory, quantity, price, dateAdded } = req.body
    try {
        const product = await Product.create({
            title,
            description, 
            category, 
            subCategory, 
            quantity,
            price, 
            dateAdded
        })
        res.status(200).json(product)
    } catch (e) {
        console.log(e);
        res.status(400).json('error occured while adding the product')
    }
}

module.exports.updateProduct = async (req, res) => {
    const { title, description, category, subCategory, quantity, price } = req.body
    const id = req.params.id
    console.log(id);
    try {
        const product = await Product.findOneAndUpdate({ _id:id }, { $set: { title, description, category, subCategory, quantity, price } })
        res.status(200).json(product)
    } catch (e) {
        console.log(e);
        res.status(400).json('error occured while updating the product')
    }
}

module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        await Product.findOneAndDelete({ _id:id })
        res.status(200).json('product deleted')
    } catch (e) {
        console.log(e);
        res.status(400).json('error occured while deleting the product')
    }
}

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (e) {
        console.log(e);
        res.status(404).json('no products found')
    }
}

module.exports.getAllProductsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.find({category})
        res.status(200).json(products)
    } catch (e) {
        console.log(e);
        res.status(404).json('no products found')
    }
}

module.exports.getAllProductsBySubCategory = async (req, res) => {
    const subCategory = req.params.subCategory;
    try {
        const products = await Product.find({subCategory})
        res.status(200).json(products)
    } catch (e) {
        console.log(e);
        res.status(404).json('no products found')
    }
}

module.exports.getProductByTitle = async (req, res) => {
    const title = req.params.title;
    try {
        const product = await Product.findOne({title})
        res.status(200).json(product)
    } catch (e) {
        console.log(e);
        res.status(404).json('no products found')
    }
}
