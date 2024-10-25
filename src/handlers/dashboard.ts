import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
  app.get('/listusers', listUsers)
  app.get('/topFive', topFive)
}

const dashboard = new DashboardQueries()

const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.listUsers()
    res.json(users)
  } catch (error) {
    console.error('listUsers Error:', error)
    throw new Error(`listUsers Error: ${error}`)
  }
}

const topFive = async (_req: Request, res: Response) => {
  try {
    const five = await dashboard.topFive()
    res.json(five)
  } catch (error) {
    console.error('topFive Error:', error)
    throw new Error(`topFive Error: ${error}`)
  }
}

export default dashboardRoutes
