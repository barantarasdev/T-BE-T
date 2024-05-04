import { pool } from "..";
import { User } from "../../types";

export async function getUsers() {
  return await pool.query("SELECT * FROM users;", []);
}

export async function getUserById(id: string) {
  return await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
}

export async function createUser({ name, email, password }: Omit<User, "id">) {
  return await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
    [name, email, password],
  );
}

export async function updateUser({ id, name, email, password }: User) {
  return await pool.query(
    "UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1;",
    [id, name, email, password],
  );
}

export async function deleteUser(id: string) {
  return await pool.query("DELETE FROM users WHERE id = $1;", [id]);
}
