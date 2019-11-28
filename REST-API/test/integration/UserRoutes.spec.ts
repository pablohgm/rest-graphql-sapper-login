import { expect } from 'chai'
import { agent as request } from 'supertest'

import { App } from '../../src/App'
import { DatabaseHelper } from '../../src/DatabaseHelper'
import { TestHelper } from '../TestHelper'

describe('Integration: UserRoutes', () => {
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

  describe('Create an User', () => {
    beforeEach(async () => {
      await TestHelper.createDefaultUser()
    })

    afterEach(() => {
      TestHelper.deleteDefaultUser()
    })

    it('should return unauthorized error', async () => {
      const response = await request(server)
        .post('/user/create')
        .send(TestHelper.getDefaultUser())
      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal('Unauthorized')
    })

    it('should return invalid user error', async () => {
      const { email, password } = TestHelper.getDefaultUser()
      const loginResponse = await request(server)
        .post('/auth/login')
        .send({ email, password })
      const response = await request(server)
        .post('/user/create')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .send({})
      expect(response.status).to.equal(400)
      expect(response.body.statusCode).to.equal(400)
      expect(response.body.message).to.equal(
        'Validation Error: "name" is required'
      )
    })

    it('should POST /user/create', async () => {
      const { email, password } = TestHelper.getDefaultUser()
      const loginResponse = await request(server)
        .post('/auth/login')
        .send({ email, password })
      const response = await request(server)
        .post('/user/create')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .send(TestHelper.getDefaultUser())
      expect(response.status).to.equal(200)
      expect(response.body.id).to.be.a('string')
    })
  })
})
