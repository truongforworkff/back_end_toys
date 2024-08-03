// controllers/productController.js
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;



// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categorySlug');
        
        // Định dạng lại kết quả
        const formattedProducts = products.map(product => ({
           
            title: product.title,
            price: product.price,
            image01: product.image01,
            image02: product.image02,
            categorySlug: product.categorySlug.slug,
            colors: product.colors, // Chỉ lấy display của category
            slug: product.slug,
            size: product.size,
            description: product.description
            
            
        }));

        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Chuyển đổi categoryId thành ObjectId
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

        // Tìm sản phẩm theo categorySlug và populate thông tin của category
        const products = await Product.find({ categorySlug: categoryObjectId }).populate('categorySlug');
        console.log('Products:', products);  // Log sản phẩm

        res.status(200).json(products);
    } catch (error) {
        console.error(error);  // Log lỗi
        res.status(500).json({ message: error.message });
    }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id; // Lấy productId từ tham số
        const product = await Product.findById(productId).populate('categorySlug'); // Populate với categorySlug

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl, category } = req.body;
    const product = new Product({ name, description, price, stock, imageUrl, category });

    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
