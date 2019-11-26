import { expect } from 'chai'
import { agent as request } from 'supertest'

import { App } from '../../src/App'
import { DatabaseHelper } from '../../src/DatabaseHelper'
import { TestHelper } from '../TestHelper'

describe('Integration: AuthRoutes', () => {
  let app, server

  before(async () => {
    app = new App()
    await DatabaseHelper.connect()
    server = app.getServer()
  })

  after(async () => {
    server.close()
    await DatabaseHelper.close()
  })

  describe('Login an User', () => {
    beforeEach(async () => {
      await TestHelper.createDefaultUser()
    })

    afterEach(() => {
      TestHelper.deleteDefaultUser()
    })

    it('should POST /login', async () => {
      const { name, email, password } = TestHelper.getDefaultUser()
      const response = await request(server)
        .post('/auth/login')
        .send({ email, password })
      expect(response.status).to.equal(200)
      expect(response.body.name).to.equal(name)
      expect(response.body.email).to.equal(email)
      expect(response.body.token).to.be.not.empty
      expect(response.body.expiresIn).to.equal('7d')
    })

    it('should NOT POST /login', async () => {
      const { email } = TestHelper.getDefaultUser()
      const response = await request(server)
        .post('/auth/login')
        .send({ email, password: 'abc' })
      expect(response.status).to.equal(400)
      expect(response.body.statusCode).to.equal(400)
      expect(response.body.message).to.equal('Invalid password')
    })
  })
})
