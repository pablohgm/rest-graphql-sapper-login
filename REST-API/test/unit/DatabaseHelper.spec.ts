import { expect } from 'chai'
import { MongoClient } from 'mongodb'
import { restore, spy, stub } from 'sinon'

import { DatabaseHelper } from '../../src/DatabaseHelper'

describe('Unit: DatabaseHelper', () => {
  before(() => {
    stub(MongoClient, 'connect')
  })

  after(() => {
    restore()
  })

  describe('Connect', () => {
    it('should execute callback function', async () => {
      const fakeCallback = spy()
      await DatabaseHelper.connect(fakeCallback)
      expect(fakeCallback.called).to.equal(true)
    })
  })
})
