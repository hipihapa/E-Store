import express from 'express'
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct  } from '../controllers/productControllers.js';

const router = express.Router();

// CRUD Functionalities
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;