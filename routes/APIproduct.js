// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /APIproducts:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /APIproducts/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getProductById);

// /**
//  * @swagger
//  * /APIproducts:
//  *   post:
//  *     summary: Create a new product
//  *     tags: [Products]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               stock:
//  *                 type: number
//  *               imageUrl:
//  *                 type: string
//  *               category:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Product created successfully
//  */
// router.post('/', productController.createProduct);

// /**
//  * @swagger
//  * /products/{id}:
//  *   put:
//  *     summary: Update a product by ID
//  *     tags: [Products]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: The ID of the product
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               stock:
//  *                 type: number
//  *               imageUrl:
//  *                 type: string
//  *               category:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Product updated successfully
//  *       404:
//  *         description: Product not found
//  */
// router.put('/:id', productController.updateProduct);

// /**
//  * @swagger
//  * /products/{id}:
//  *   delete:
//  *     summary: Delete a product by ID
//  *     tags: [Products]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: The ID of the product
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Product deleted successfully
//  *       404:
//  *         description: Product not found
//  */
// router.delete('/:id', productController.deleteProduct);

/**
 * @swagger
 * /APIproducts/category/{categoryId}:
 *   get:
 *     summary: Retrieve products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the category
 *     responses:
 *       200:
 *         description: A list of products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 *                   category:
 *                     type: string
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/category/:categoryId', productController.getProductsByCategory);


module.exports = router;
