import { expect } from 'chai'
import { mock } from 'ts-mockito'

import { UserRepository } from '../../src/repositories/UserRepository'
import { UserService } from '../../src/services/UserService'

describe('Unit: UserService', () => {
  let service, repository

  before(async () => {
    repository = mock(UserRepository)
  })

  beforeEach(() => {
    service = new UserService(repository)
  })

  it('should generate an authentication token', async () => {
    const id = '5db093b69d0f166614b9aede'
    const result = await service.generateAuthToken(id)
    expect(result).to.be.ok
    expect(result).to.be.an('string')
  })

  it('should encrypt the password', async () => {
    const password = 'somepassword'
    const result = await service.encryptPassword(password)
    expect(result).to.be.ok
    expect(result).to.be.an('string')
  })
})
