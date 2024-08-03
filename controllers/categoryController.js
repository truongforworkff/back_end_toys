

const Category = require('../models/categoryModel');

// Lấy danh sách danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const formatted = categories.map(category => ({
            display : category.display,
            categorySlug: category.slug
           
            
        }));
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Lấy danh mục theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm danh mục mới
exports.createCategory = async (req, res) => {
    const { display, slug } = req.body; // Chỉ lấy các trường phù hợp với model

    const category = new Category({ display, slug });

    try {
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật danh mục
// exports.updateCategory = async (req, res) => {
//     const { display, slug } = req.body; // Chỉ lấy các trường phù hợp với model

//     try {
//         const updatedCategory = await Category.findByIdAndUpdate(
//             req.params.id,
//             { display, slug },
//             { new: true }
//         );

//         if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
//         res.json(updatedCategory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Xóa danh mục
// exports.deleteCategory = async (req, res) => {
//     try {
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
//         res.json({ message: 'Category deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };