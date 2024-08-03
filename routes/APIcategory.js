// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /APIcategories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /APIcategories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single category
 *       404:
 *         description: Category not found
 */
router.get('/:id', categoryController.getCategoryById);

// /**
//  * @swagger
//  * /categories:
//  *   post:
//  *     summary: Create a new category
//  *     tags: [Categories]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               imageUrl:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Category created successfully
//  */
// router.post('/', categoryController.createCategory);

// /**
//  * @swagger
//  * /categories/{id}:
//  *   put:
//  *     summary: Update a category by ID
//  *     tags: [Categories]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: The ID of the category
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
//  *               imageUrl:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Category updated successfully
//  *       404:
//  *         description: Category not found
//  */
// router.put('/:id', categoryController.updateCategory);

// /**
//  * @swagger
//  * /categories/{id}:
//  *   delete:
//  *     summary: Delete a category by ID
//  *     tags: [Categories]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: The ID of the category
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Category deleted successfully
//  *       404:
//  *         description: Category not found
//  */
// router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
