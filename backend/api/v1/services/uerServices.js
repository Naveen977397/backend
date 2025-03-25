import pool from '../../db/index.js'
import bcrypt from 'bcryptjs';

export const createUser = async (user_name, email, password) => {
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert user
        const query = `INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const response = await pool.query(query, [user_name, email, hashedPassword]);

        return response.rows[0]; // Return the newly created user
    } catch (error) {
        console.error("Error creating user:", error);

        // Handle unique constraint violation (duplicate email)
        if (error.code === "23505") {
            throw new Error("Email already exists. Please use a different email.");
        }

        // Handle any other database errors
        throw new Error("Internal Server Error");
    }
};

export const finduserbyEmail = async (email) => {
    const query = `select * from users where email = $1`;
    const response = await pool.query(query, [email]);
    return response.rows[0];
}