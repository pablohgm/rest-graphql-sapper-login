import { expect } from 'chai'
import { MongoClient } from 'mongodb'
import { restore, stub } from 'sinon'

import { App } from '../../src/App'

describe('Unit: App', () => {
  let app

  before(() => {
    app = new App()
    stub(MongoClient, 'connect')
  })

  after(() => {
    restore()
  })

  describe('Start', () => {
    it('should execute connect function', async () => {
      const result = await app.start()
      expect(result).to.be.undefined
    })
  })
})
