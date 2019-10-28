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
      password: 'somepassword!',
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
      expect(result).to.be.an('string')
      expect(result.length).to.equal(24)
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
      expect(result.user.name).to.be.an('string')
      expect(result.user.password).to.be.an('string')
      expect(result.token).to.be.an('string')
    })

    it('should return invalid email error', async () => {
      const result = await service.login('', user.password)
      expect(result).to.be.ok
      expect(result.user).to.equal(undefined)
      expect(result.token).to.equal(undefined)
      expect(result.error).to.equal('Invalid email')
    })

    it('should return invalid password error', async () => {
      const result = await service.login(user.email, '')
      expect(result).to.be.ok
      expect(result.user).to.equal(undefined)
      expect(result.token).to.equal(undefined)
      expect(result.error).to.equal('Invalid password')
    })
  })
})
