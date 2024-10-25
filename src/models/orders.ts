import client from '../database'

export type Order = {
  id?: BigInteger
  status: string
  user_ID: number
}

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders (status, user_ID) VALUES ($1, $2) RETURNING *'
      const values = [order.status, order.user_ID]
      // console.log('Order values', values)
      const result = await conn.query(sql, values)
      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`)
    }
  }
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not retrieve orders. Error: ${err}`)
    }
  }
  async show(id: string): Promise<Order | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()

      if (result.rows.length > 0) {
        return result.rows[0]
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Could not retrieve order. Error: ${err}`)
    }
  }

  async addProduct(
    quantity: string,
    order_ID: string,
    product_ID: string,
  ): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO order_products (quantity, order_ID, product_ID) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [quantity, order_ID, product_ID])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(
        `Could not add product ${product_ID} to order ${order_ID} Error: ${err}`,
      )
    }
  }

  async showProducts(user_ID: string): Promise<Order | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders INNER JOIN order_products on order_products.order_ID = orders.ID where user_ID = $1'
      const result = await conn.query(sql, [user_ID])
      conn.release()

      if (result.rows.length > 0) {
        return result.rows[0]
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Could not retrieve order products. Error: ${err}`)
    }
  }


}
