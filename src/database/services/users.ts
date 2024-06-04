// import { pool } from "..";
// import { User } from "../../types";

// export async function getUsers() {
//   return await pool.query("SELECT * FROM user_;", []);
// }

// export async function getUserById(id: string) {
//   return await pool.query("SELECT * FROM user_ WHERE id = $1;", [id]);
// }

// export async function createUser({ name, email, password }: Omit<User, "id">) {
//   return await pool.query(
//     "INSERT INTO user_ (name, email, password) VALUES ($1, $2, $3);",
//     [name, email, password],
//   );
// }

// export async function updateUser({ id, name, email, password }: User) {
//   return await pool.query(
//     "UPDATE user_ SET name = $2, email = $3, password = $4 WHERE id = $1;",
//     [id, name, email, password],
//   );
// }

// export async function deleteUser(id: string) {
//   return await pool.query("DELETE FROM user_ WHERE id = $1;", [id]);
// }
