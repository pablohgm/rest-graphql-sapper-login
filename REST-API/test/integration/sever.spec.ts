import { agent as request } from 'supertest'
import { expect } from 'chai'
import server from '../../server'

describe('Unit: Server', () => {
  it('should GET /', async () => {
    const response = await request(server).get('/')
    expect(response.status).to.equal(200)
    expect(response.text).to.be.an('string')
  })
})
