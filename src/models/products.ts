import client from '../database'

export type Product = {
  id?: string
  name: string
  price: string
}

export class ProductStore {
  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
      const values = [product.name, product.price]
      const result = await conn.query(sql, values)
      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create product. Error: ${err}`)
    }
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not add product. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()

      if (result.rows.length > 0) {
        return result.rows[0]
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Could not retrieve product. Error: ${err}`)
    }
  }
}
