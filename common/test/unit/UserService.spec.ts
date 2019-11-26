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
    const result = await service.generateAuthToken(id, '7d')
    expect(result).to.be.ok
    expect(result).to.be.an('string')
  })

  it('should encrypt the password', async () => {
    const password = 'somepassword'
    const result = await service.encryptPassword(password)
    expect(result).to.be.ok
    expect(result).to.be.an('string')
  })

  describe('User validation', () => {
    it('name validation', async () => {
      let result = await service.create({ name: '', password: '', email: '' })
      expect(result.message).to.equal(
        'Validation Error: "name" is not allowed to be empty'
      )
      expect(result.statusCode).to.equal(400)
      result = await service.create({
        name: 'test_test',
        password: 'fake_1234',
        email: 'test@test.com'
      })
      expect(result.message).to.equal(
        'Validation Error: "name" must only contain alpha-numeric characters'
      )
      expect(result.statusCode).to.equal(400)
      result = await service.create({
        name: 'invalidUserNameTooLoooooooooooooooong',
        password: 'fake_1234',
        email: 'test@test.com'
      })
      expect(result.message).to.equal(
        'Validation Error: "name" length must be less than or equal to 30 characters long'
      )
      expect(result.statusCode).to.equal(400)
    })

    it('password validation', async () => {
      let result = await service.create({
        name: 'test',
        password: '',
        email: ''
      })
      expect(result.message).to.equal(
        'Validation Error: "password" is not allowed to be empty'
      )
      expect(result.statusCode).to.equal(400)
      result = await service.create({
        name: 't',
        password: 'fake_1234',
        email: 'test@test.com'
      })
      expect(result.message).to.equal(
        'Validation Error: "name" length must be at least 3 characters long'
      )
      expect(result.statusCode).to.equal(400)
      result = await service.create({
        name: 'test',
        password: 't',
        email: 'test@test.com'
      })
      expect(result.message).to.equal(
        'Validation Error: "password" with value "t" fails to match the The password should have minimum eight characters pattern'
      )
      expect(result.statusCode).to.equal(400)
    })

    it('email validation', async () => {
      let result = await service.create({
        name: 'test',
        password: 'fake_1234',
        email: ''
      })
      expect(result.message).to.equal(
        'Validation Error: "email" is not allowed to be empty'
      )
      expect(result.statusCode).to.equal(400)
      result = await service.create({
        name: 'test',
        password: 'fake_1234',
        email: 'test'
      })
      expect(result.message).to.equal(
        'Validation Error: "email" must be a valid email'
      )
      expect(result.statusCode).to.equal(400)
    })
  })

  describe('Login validation', () => {
    it('password validation', async () => {
      let result = await service.login('test@test.com', undefined)
      expect(result.message).to.equal(
        'Validation Error: "password" is required'
      )
      expect(result.statusCode).to.equal(400)
      result = await service.login('test@test.com', '')
      expect(result.message).to.equal(
        'Validation Error: "password" is not allowed to be empty'
      )
      expect(result.statusCode).to.equal(400)
    })

    it('email validation', async () => {
      let result = await service.login(undefined, 'fake_1234')
      expect(result.message).to.equal('Validation Error: "email" is required')
      expect(result.statusCode).to.equal(400)
      result = await service.login('', 'fake_1234')
      expect(result.message).to.equal(
        'Validation Error: "email" is not allowed to be empty'
      )
      expect(result.statusCode).to.equal(400)
      result = await service.login('test', 'fake_1234')
      expect(result.message).to.equal(
        'Validation Error: "email" must be a valid email'
      )
      expect(result.statusCode).to.equal(400)
    })
  })
})
