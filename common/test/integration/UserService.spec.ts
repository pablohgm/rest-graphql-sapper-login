import { expect } from 'chai'
import { MongoClient } from 'mongodb'

import { UserRepository } from '../../src/repositories/UserRepository'
import { UserService } from '../../src/services/UserService'

describe('Integration: UserService', () => {
  let service, repository, client, database, user

  before(async () => {
    const { MONGO_TEST_URI, MONGO_DATABASE } = process.env
    client = await MongoClient.connect(MONGO_TEST_URI, {
      useUnifiedTopology: true
    })
    database = client.db(MONGO_DATABASE)
    user = {
      name: 'pablohgm',
      password: 'somePassword!',
      email: 'some-email@gmail.com'
    }
  })

  after(() => {
    client.close()
  })

  beforeEach(() => {
    repository = new UserRepository(database)
    service = new UserService(repository)
  })

  describe('Create and Delete:', () => {
    it('should create an user', async () => {
      const result = await service.create(user)
      expect(result).to.be.ok
      expect(result.id).to.be.an('string')
      expect(result.id.length).to.equal(24)
    })

    it('should delete an user', async () => {
      const result = await service.deleteByEmail(user.email)
      expect(result).to.be.ok
      expect(result).to.be.an('boolean')
      expect(result).to.equal(true)
    })
  })

  describe('Login:', () => {
    it('should login an user', async () => {
      const result = await service.login(user.email, user.password)
      expect(result).to.be.ok
      expect(result.email).to.be.an('string')
      expect(result.name).to.be.an('string')
      expect(result.token).to.be.an('string')
      expect(result.expiresIn).to.be.an('string')
    })

    it('should return invalid email error', async () => {
      const result = await service.login('a@test.com', user.password)
      expect(result).to.be.ok
      expect(result.message).to.equal('Invalid email')
      expect(result.statusCode).to.equal(400)
    })

    it('should return invalid password error', async () => {
      const result = await service.login(user.email, 'fakePassword')
      expect(result).to.be.ok
      expect(result.message).to.equal('Invalid password')
      expect(result.statusCode).to.equal(400)
    })
  })
})
