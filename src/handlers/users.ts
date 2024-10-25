import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/users'
import jwt from 'jsonwebtoken'

const userRoutes = (app: express.Application) => {
  app.post('/users', create)
  app.get('/users', index)
  app.get('/users/:id', show)
}

const userStore = new UserStore()

// Endpoint for creating a new user
const create = async (req: Request, res: Response) => {
  try {  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest,
  }
  const secret = process.env.TOKEN_SECRET as unknown as string
    const authHeader = req.headers.authorization as unknown as string
    const authToken = authHeader.split(' ')[1]
    jwt.verify(authToken, secret)
    const newUser = await userStore.create(user)
    const token = jwt.sign({ user: newUser }, secret)
    res.json(token)
  } catch (err) {
    res.status(401).json(err)
  }
}

const index = async (_req: Request, res: Response) => {
  try {
    const secret = process.env.TOKEN_SECRET as unknown as string
    const authHeader = _req.headers.authorization as unknown as string
    //handle missing authHeader
    if (!authHeader) {
      res.status(401).json({ error: 'missing Authorization header' });
      return;
    }

    const authToken = authHeader.split(' ')[1]
    jwt.verify(authToken, secret)
    const users = await userStore.index()
    const token = jwt.sign({ user: users }, secret)
    res.json(token)
  } catch (error) {
    console.error('index Error:', error)
    throw new Error(`index Error: ${error}`)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const secret = process.env.TOKEN_SECRET as unknown as string
    const authHeader = _req.headers.authorization as unknown as string
    if (!authHeader) {
      res.status(401).json({ error: 'missing Authorization header' });
      return;
    }
    const authToken = authHeader.split(' ')[1]
    jwt.verify(authToken, secret)
    const user = await userStore.show(_req.params.id)
    const token = jwt.sign({ user: user }, secret)
    res.json(token)
  } catch (error) {
    console.error('show Error:', error)
    throw new Error(`show Error: ${error}`)
  }
}

export default userRoutes

//fix formatting to be like other ones
