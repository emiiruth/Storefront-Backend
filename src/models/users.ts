import client from '../database'
import bcrypt from 'bcrypt'

const pepper = 'secret-string'
const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10')

export interface User {
  id?: number
  first_name: string
  last_name: string
  password_digest: string
}

export class UserStore {
  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *'
      const hash = bcrypt.hashSync(user.password_digest + pepper, saltRounds)
      const values = [user.first_name, user.last_name, hash]
      const result = await conn.query(sql, values)
      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`)
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not retrieve user. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()

      if (result.rows.length > 0) {
        return result.rows[0]
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Could not retrieve user. Error: ${err}`)
    }
  }
}
