import Crossword from '../../src/modules/Crossword';

describe('Crossword', () => {
  describe('.generateEmptyGrid', () => {
    let emptyArray;

    beforeEach(() => {
      emptyArray = Crossword.generateEmptyGrid(4);
    })

    it('creates a square array of arrays', () => {
      expect(emptyArray).toEqual(jasmine.any(Array));
      expect(emptyArray[0]).toEqual(jasmine.any(Array));
      expect(emptyArray.length).toEqual(4);
      expect(emptyArray[0].length).toEqual(4);
    })

    it('is initialized with empty strings for every value in the array', () => {
      for (var i = 0; i < emptyArray.length; i++) {
        for (var j = 0; j < emptyArray.length; j++) {
          expect(emptyArray[i][j]).toEqual('');
        }
      }
    })
  })

  describe('.parseArrayToGrid', () => {
    let linear, square, grid;
    beforeEach(() => {
      linear = [1,2,3,4,5,6,7,8,9]
      square =
        [[1,2,3],
         [4,5,6],
         [7,8,9]];
      grid = Crossword.parseArrayToGrid(linear);
    })

    it('returns a square array of arrays', () => {


      expect(grid[0]).toEqual(jasmine.any(Array))
      expect(grid.length).toEqual(grid[0].length)
    })

    it('reads array values into grid row-wise', () => {
      expect(grid).toEqual(square);
    })

    it('throws an error if the length of the given array is not a perfect square', () => {
      let badInput = linear.concat([1]);
      expect(() => {
        let c = Crossword.parseArrayToGrid(badInput)
      }).toThrow();
    })
  })

  xdescribe('new Crossword', () => {

  })

  xdescribe('.getGridNums', () => {

  })

  xdescribe('.getAcrossClues', () => {

  })

  xdescribe('.getDownClues', () => {

  })

  xdescribe('.getSelectedClue', () => {

  })

  xdescribe('.nextCell', () => {

  })

  xdescribe('.nextCellWithinClue', () => {

  })
})
