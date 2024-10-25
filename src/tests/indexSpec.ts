import { app } from './../server'
import request from 'supertest'
import { OrderStore } from '../models/orders'
import { ProductStore } from '../models/products'
import { UserStore } from '../models/users'
import { DashboardQueries } from '../services/dashboard'
import client from '../database'
import { Order } from 'sequelize'
import jwt from 'jsonwebtoken'

const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()
const dashboardStore = new DashboardQueries()

beforeAll(async () => {
  try {
    await userStore.create({
      first_name: 'emi',
      last_name: 'ruth',
      password_digest: 'test',
    })
    const product = await productStore.create({
      name: 'testProduct',
      price: '10',
    })
    await orderStore.create({ status: 'active', user_ID: 1 })
    await orderStore.addProduct('1', '1', product.id as string)
  } catch (error) {
    console.log(error)
  }
})
afterAll(async () => {
  console.log('AFTERALL RUNNING')
  const conn = await client.connect()
  const sql =
    'TRUNCATE orders, products, users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE orders_id_seq RESTART WITH 1; ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE order_products_id_seq RESTART WITH 1'
  await conn.query(sql)
  conn.release()
})

describe('Endpoint Tests', (): void => {
  describe('Users Endpoint Tests', (): void => {
    it('create should return a successful response', async (): Promise<void> => {
      try {
        const secret = process.env.TOKEN_SECRET as string
        const token = jwt.sign({first_name: 'firstname',
        last_name: 'lastname', password_digest: 'passworddigest'}, secret)
        const response: request.Response = await request(app)
          .post('/users')
          .set('Authorization', `Bearer ${token}`)
          .send({
            first_name: 'firstname',
            last_name: 'lastname',
            password_digest: 'passworddigest',
          })
        expect(response.status).toBe(200)
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      } //expect successful response
    })

    it('get should return a successful response', async (): Promise<void> => {
      try {
        const secret = process.env.TOKEN_SECRET as string
        const payload = {}
        const token = jwt.sign(payload,secret)
        const response: request.Response = await request(app).get('/users')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('show should return a successful response', async (): Promise<void> => {
      try {
        const secret = process.env.TOKEN_SECRET as string
        const payload = {}
        const token = jwt.sign(payload,secret)
        const response: request.Response = await request(app).get('/users/1')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
  })

  describe('Products Endpoint Tests', (): void => {
    it('index get should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app).get('/products')
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('show should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app).get('/products/1')
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('create should return a successful response', async (): Promise<void> => {
      try {
        const secret = process.env.TOKEN_SECRET as string
        const token = jwt.sign({name: 'name',
        price: '1'}, secret)
        const response: request.Response = await request(app)
          .post('/products')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name:'name',
            price: '1',
          })
        expect(response.status).toBe(200)
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      } //expect successful response
    })
  })

  describe('Orders Endpoint Tests', (): void => {
    it('index should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app).get('/orders')
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('show should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app).get('/orders/1')
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('create should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app)
          .post('/orders')
          .send({
            user_ID: '1',
            status: 'active',
          })
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('orders-products create should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app)
          .post('/orders/1/products')
          .send({
            quantity: '1',
            order_ID: '1',
            product_ID: '1',
          })
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('orders-products show should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response =
          await request(app).get('/orders/1/products')
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
  })

  describe('Misc Endpoint Tests', (): void => {
    it('listUsers  should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app).get('/listusers')
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('topFive should return a successful response', async (): Promise<void> => {
      try {
        const response: request.Response = await request(app).get('/topfive')
        expect(response.status).toBe(200) //expect successful response
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
  })
})

describe('Database Action Tests', (): void => {
  describe('For Users Model', (): void => {
    it('should have a create method', async (): Promise<void> => {
      try {
        expect(userStore.create).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should create a user', async (): Promise<void> => {
      try {
        const result = await userStore.create({
          first_name: 'test first',
          last_name: 'test last',
          password_digest: 'test password',
        })
        expect(result.first_name).toEqual('test first')
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should have a show method', async (): Promise<void> => {
      try {
        expect(userStore.show).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should show the correct user', async (): Promise<void> => {
      try {
        const result = await userStore.show('1')
        const check = result?.first_name
        expect(check).toEqual('emi')
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should have an index method', async (): Promise<void> => {
      try {
        expect(userStore.index).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should return a list', async (): Promise<void> => {
      try {
        const result = await userStore.index()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
  })
  describe('For Products Model', (): void => {
    it('should have a show method', async (): Promise<void> => {
      try {
        expect(productStore.show).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should show the correct product', async (): Promise<void> => {
      try {
        const result = await productStore.show('1')
        const check = result?.name
        expect(check).toEqual('testProduct')
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should have an index method', async (): Promise<void> => {
      try {
        expect(productStore.index).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should return a list', async (): Promise<void> => {
      try {
        const result = await productStore.index()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should have a create method', async (): Promise<void> => {
      try {
        expect(productStore.create).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should create a product', async (): Promise<void> => {
      try {
        const result = await productStore.create({
          name: 'test product',
          price: '1',
        })
        expect(result.name).toEqual('test product')
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
  })
  describe('For Orders Model', (): void => {
    it('should have a show method', async (): Promise<void> => {
      try {
        expect(orderStore.show).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should show the correct order', async (): Promise<void> => {
      try {
        const result = await orderStore.show('1')
        const check = result?.status
        expect(check).toEqual('active')
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should have an index method', async (): Promise<void> => {
      try {
        expect(orderStore.index).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should return a list', async (): Promise<void> => {
      try {
        const result = await orderStore.index()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should have a create method', async (): Promise<void> => {
      try {
        expect(orderStore.create).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should create an order', async (): Promise<void> => {
      try {
        const result = await orderStore.create({
          status: 'active',
          user_ID: 1,
        })
        expect(result.status).toEqual('active')
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should have a addProduct method', async (): Promise<void> => {
      try {
        expect(orderStore.addProduct).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should add product', async (): Promise<void> => {
      try {
        const result = await orderStore.addProduct('1', '1', '1')
        const propertyNames = Object.keys(result)
        expect(propertyNames).toEqual([
          'id',
          'quantity',
          'order_id',
          'product_id',
        ])
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should have a showProducts method', async (): Promise<void> => {
      try {
        expect(orderStore.showProducts).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
    it('should show added product', async (): Promise<void> => {
      try {
        const result = await orderStore.showProducts('1')
        if (result !== null && result !== undefined) {
          const propertyNames = Object.keys(result)
          expect(propertyNames).toEqual([
            'id',
            'status',
            'user_id',
            'quantity',
            'order_id',
            "product_id"
          ])
        } else {
          console.error('null error')
        }
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
  })

  describe('For Dashboards Service', (): void => {
    it('should have a topFive method', async (): Promise<void> => {
      try {
        expect(dashboardStore.topFive).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('topFive should return list', async (): Promise<void> => {
      try {
        const result = await dashboardStore.topFive()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('should have a listUsers method', async (): Promise<void> => {
      try {
        expect(dashboardStore.listUsers).toBeDefined()
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })

    it('listUsers should return list', async (): Promise<void> => {
      try {
        const result = await dashboardStore.listUsers()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.error('test Error:', error)
        throw new Error(`test Error: ${error}`)
      }
    })
  })
})
