import { expect } from 'chai'

import { DatabaseHelper } from '../../src/DatabaseHelper'

describe('Integration: DatabaseHelper', () => {
  before(async () => {
    await DatabaseHelper.connect()
  })

  after(async () => {
    await DatabaseHelper.close()
  })

  describe('Get the database instance', () => {
    it('should get the data base instance', () => {
      const result = DatabaseHelper.get()
      expect(result).to.be.ok
    })
  })

  describe('Close the  database instance', () => {
    it('should close the data base instance', async () => {
      const result = await DatabaseHelper.close()
      expect(result).to.be.null
    })
  })
})
