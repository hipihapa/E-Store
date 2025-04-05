import { sql } from "../config/db.js";

// getting products
export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
    console.log("fetched products");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// getting a product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const getProduct = await sql`
    SELECT * FROM products WHERE id=${id}
    `;
    res.status(200).json({ success: true, data: getProduct[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// creating a product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory" });
  }
  try {
    const newProduct = await sql`
    INSERT INTO products (name, price, image)
    VALUES (${name}, ${price}, ${image})
    RETURNING *
    `;
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// updating a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateProduct = await sql`
        UPDATE products 
        SET name=${name}, price=${price}, image=${image}
        WHERE id=${id}
        RETURNING *
        `;

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found or no changes made",
      });
    }

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// deleting a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await sql`
        DELETE FROM products
        WHERE id=${id}
        RETURNING *
    `;

    if (deleteProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found or no changes made",
      });
    }

    res.status(200).json({ success: true, data: deleteProduct[0], message: "Product Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
