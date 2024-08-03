const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); 
const Category = require('../models/categoryModel');

// Route để lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    try {
      const products = await Product.find().populate('categorySlug', 'display'); // Thêm populate để lấy tên danh mục
      res.render('products', { products });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  router.get('/add-product', async (req, res) => {
    try {
      const categories = await Category.find(); // Lấy danh sách các danh mục từ database
      const colors = [ 'orange','blue', 'green', 'yellow', 'black', 'white']; // Màu sắc khả dụng
      const sizes = ['s', 'm', 'l', 'xl', 'xxl']; // Kích thước khả dụng
      res.render('add-product', { categories, colors, sizes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  

// Route để xử lý thêm sản phẩm
router.post('/add-product', async (req, res) => {
    const { title, price, image01, image02, categorySlug, colors, sizes } = req.body;
    console.log('Received data:', req.body);
    // Xử lý dữ liệu để phù hợp với mô hình Product
    try {
      const newProduct = new Product({
        title,
        price,
        image01,
        image02,
        categorySlug, // ID danh mục
        slug: title.toLowerCase().replace(/ /g, '-'), // Tạo slug từ tiêu đề
        description: 'Mô tả sản phẩm ở đây', // Cung cấp mô tả sản phẩm (có thể tùy chỉnh)
        colors: Array.isArray(colors) ? colors : [colors], // Chuyển đổi thành mảng nếu cần
        size: Array.isArray(sizes) ? sizes : [sizes], // Chuyển đổi thành mảng nếu cần
      });
  
      await newProduct.save();
      res.redirect('/products'); // Chuyển hướng đến trang danh sách sản phẩm
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
// Route để hiển thị form chỉnh sửa sản phẩm
router.get('/edit-product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categorySlug');
        const categories = await Category.find(); // Lấy danh sách danh mục
        const colors = ['orange', 'blue', 'green', 'yellow', 'black', 'white']; // Màu sắc khả dụng
        const sizes = ['s', 'm', 'l', 'xl', 'xxl']; // Kích thước khả dụng

        // Đánh dấu danh mục đã chọn
        categories.forEach(category => {
            category.isSelected = (category._id.toString() === product.categorySlug._id.toString());
        });

        // Đánh dấu màu sắc đã chọn
        const markedColors = colors.map(color => ({
            color,
            isSelected: Array.isArray(product.colors) && product.colors.includes(color)
        }));

        // Đánh dấu kích thước đã chọn
        const markedSizes = sizes.map(size => ({
            size,
            isSelected: Array.isArray(product.size) && product.size.includes(size)
        }));

        res.render('edit-product', { product, categories, colors: markedColors, sizes: markedSizes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving product');
    }
});




// Route để cập nhật sản phẩm
router.post('/edit-product/:id', async (req, res) => {
    let  id =  req.params.id;
     console.log(id)
    console.log('Received data:', req.body);
    const { title, price, image01, image02, description, categorySlug, colors, size } = req.body;

    // In từng trường ra để kiểm tra
    // console.log('Title:', title);
    // console.log('Price:', price);
    // console.log('Image 01:', image01);
    // console.log('Image 02:', image02);
    // console.log('Description:', description);
    // console.log('Category:', categorySlug);
    // console.log('Colors:', colors);
    // console.log('Sizes:', sizes);

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


    try {
        // Tìm sản phẩm theo ID và cập nhật thông tin
        await Product.findByIdAndUpdate(id, {
            title,
            description,
            price,
            image01,
            image02,
            categorySlug, // ID danh mục từ form
            colors: colors || [], // Mảng màu sắc, mặc định là mảng rỗng nếu không có
            size: size || [], // Mảng kích thước, mặc định là mảng rỗng nếu không có
            slug
        });

        // Chuyển hướng đến trang sản phẩm sau khi cập nhật
       
        message = 'Product updated successfully!';
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating product');
    }

    

});
  

// Route để xóa sản phẩm
router.post('/delete-product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
