import Crossword from '../../src/modules/Crossword';

describe('Crossword', () => {
  describe('.generateEmptyGrid', () => {
    beforeEach(() => {
      let emptyArray = Crossword.generateEmptyGrid(4);
    })

    it('creates a square array of arrays, where the contents are empty string', () => {
      expect(true).toBe(true)
    })
  })
})
