import client from '../database'

export class DashboardQueries {
  //users that have an order
  async listUsers(): Promise<{ username: string }[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users and orders: ${err}`)
    }
  }

  async topFive(): Promise<{ name: string; price: number }[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get most expensive products: ${err}`)
    }
  }
}

//SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;
