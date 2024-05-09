import { pool } from "..";
import { Product, ProductFactory } from "../../types";

export async function getAllProducts() {
  return await pool.query(
    `SELECT
      p.id,
      p.name,
      p.quantity,
      p.user_id AS userId,
      COUNT(pf.product_id) AS dublicatedProducts
    FROM
      product p
    LEFT JOIN
      user_ u ON p.user_id = u.id
    LEFT JOIN
      product_factory pf ON pf.product_id = p.id
    GROUP BY 
      p.id, 
      p.name, 
      p.quantity, 
      p.user_id;`,
    [],
  );
}

export async function searchProduct(
  partOfProductName: string,
  lastId: string,
  limit: number,
) {
  return await pool.query(
    `SELECT
      *
    FROM
      product
    WHERE
      id < $2 AND name LIKE $1
    ORDER BY
      id
    LIMIT $3
    ;`,
    [`%${partOfProductName}%`, lastId, limit],
  );
}

export async function createProduct({
  name,
  quantity,
  price,
  userId,
  factoryId,
}: Omit<Product, "id">) {
  return await pool.query(
    "INSERT INTO product (name, quantity, price, user_id, factory_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
    [name, quantity, price, userId, factoryId],
  );
}

export async function createProductFactory({
  productId,
  factoryId,
}: Omit<ProductFactory, "id">) {
  return await pool.query(
    "INSERT INTO product_factory (product_id, factory_id) VALUES ($1, $2);",
    [productId, factoryId],
  );
}
