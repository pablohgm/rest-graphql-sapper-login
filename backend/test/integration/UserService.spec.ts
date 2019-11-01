import { expect } from 'chai'
import { MongoClient } from 'mongodb'
import { UserService } from '../../src/services/UserService'
import { UserRepository } from '../../src/repository/UserRepository'

describe('Integration: UserService', () => {
  let service, repository, client, database

  before(async () => {
    const { MONGO_TEST_URI, MONGO_DATABASE } = process.env
    client = await MongoClient.connect(MONGO_TEST_URI, {
      useUnifiedTopology: true
    })
    database = client.db(MONGO_DATABASE)
  })

  after(() => {
    client.close()
  })

  beforeEach(() => {
    repository = new UserRepository(database)
    service = new UserService(repository)
  })

  it('should create an user', async () => {
    const body = {
      name: 'pablohgm',
      password: 'somepassword',
      email: 'some-email@gmail.com'
    }

    const result = await service.create(body)
    expect(result).to.be.ok
    expect(result).to.be.an('string')
    expect(result.length).to.equal(24)
  })
})
