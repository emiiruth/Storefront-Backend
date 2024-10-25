import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import jwt, { Secret } from 'jsonwebtoken'

const productRoutes = (app: express.Application) => {
  app.post('/products', create)
  app.get('/products', index)
  app.get('/products/:id', show)
}

const productStore = new ProductStore()

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    }
    const secret = process.env.TOKEN_SECRET as unknown as string
    const authHeader = req.headers.authorization as unknown as string
    const authToken = authHeader.split(' ')[1]
    jwt.verify(authToken, secret)
    const newProduct = await productStore.create(product)
    const token = jwt.sign({ product: newProduct }, secret)
    res.json(token)
  } catch (err) {
    res.status(401).json(err)
    return
  }
}

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await productStore.index()
    res.json(orders)
  } catch (error) {
    console.error('index Error:', error)
    throw new Error(`index Error: ${error}`)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const order = await productStore.show(_req.params.id)
    res.json(order)
  } catch (error) {
    console.error('show Error:', error)
    throw new Error(`listUsers Error: ${error}`)
  }
}

export default productRoutes
