import User from '../types/user.type';
import pool from '../database/index';
import config from '../config/config';
import bcrypt from 'bcrypt';

const hashPasswordbycrypt = (password: string | any) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  async register(u: User): Promise<User> {
    try {
      // open connection
      const connection = await pool.connect();
      const sql = `INSERT INTO public.users(
         firstname, lastname, email, password, confpassword, phone)
        VALUES ( $1, $2, $3, $4, $5, $6) returning *`;
      // run query
      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hashPasswordbycrypt(u.password),
        hashPasswordbycrypt(u.confpassword),
        u.phone,
      ]);
      //release connection
      connection.release();
      //return created users
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to create new users');
    }
  }

  async getusers(): Promise<User[]> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('no database get');
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPasswordbycrypt } = result.rows[0];
        const isPasswordVaild = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPasswordbycrypt
        );
        if (isPasswordVaild) {
          const userInfo = await connection.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error('No email or password are vaild !!');
    }
  }
}
export default UserModel;
