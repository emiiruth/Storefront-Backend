import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'
import jwt from 'jsonwebtoken'

const orderRoutes = (app: express.Application) => {
  app.post('/orders', create)
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders/:id/products', addProduct)
  app.get('/orders/:user_ID/products', showProducts)
  

}

const orderStore = new OrderStore()

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    user_ID: _req.body.user_ID,
    status: 'active',
  }
  try {
    const newOrder = await orderStore.create(order)
    const secretKey = process.env.TOKEN_SECRET as string
    const token = jwt.sign({ order: newOrder }, secretKey)
    res.json(token)
  } catch (err) {
    console.error('Error creating order:', err)
    res.status(400)
    res.json(err)
  }
}

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await orderStore.index()
    res.json(orders)
  } catch (error) {
    console.error('index Error:', error)
    throw new Error(`index Error: ${error}`)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const order = await orderStore.show(_req.params.id)
    res.json(order)
  } catch (error) {
    console.error('show Error:', error)
    throw new Error(`show Error: ${error}`)
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const quantity: string = _req.body.quantity
  const product_ID: string = _req.body.product_ID
  const order_ID: string = _req.params.id
  try {
    const addedProduct = await orderStore.addProduct(
      quantity,
      order_ID,
      product_ID,
    )
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showProducts = async (_req: Request, res: Response) => {
  try {
    const order = await orderStore.showProducts(_req.params.user_ID)
    res.json(order)
  } catch (error) {
    console.error('showProducts Error:', error)
    throw new Error(`showProducts Error: ${error}`)
  }
}

export default orderRoutes
