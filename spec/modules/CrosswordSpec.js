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

  describe('new Crossword', () => {
    let crossword, square, clues
    beforeEach(() => {
      square =
        [[1,2,3],
         [4,5,6],
         [7,8,9]];
      clues = {
        across: ['across1', 'across2'],
        down: ['down1', 'down2']
      }
      crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(3))
    })

    it('has a grid property', () => {
      expect(crossword.grid).toEqual(jasmine.any(Array))
      expect(crossword.grid).toEqual(square)
    })

    it('has a clues property', () => {
      expect(crossword.clues).toEqual(jasmine.any(Object))
      expect(crossword.clues['across']).toEqual(clues['across'])
      expect(crossword.clues['across']).toEqual(jasmine.any(Array))
    })

    it('has a userLetters property', () => {
      expect(crossword.userLetters).toEqual(jasmine.any(Array))
      expect(crossword.userLetters[0]).toEqual(jasmine.any(Array))
      expect(crossword.userLetters[0][0]).toEqual('')
    })
  })

  describe('.getGridNums', () => {
    let crossword, square, clues, gridNums, expectedResult
    beforeAll(() => {
      square =
        [['a','.','c','d'],
         ['e','.','g','h'],
         ['i','j','k','l'],
         ['m','n','.','.']];
      expectedResult =
        [[1,0,2,3],
         [4,0,5,0],
         [6,7,0,0],
         [8,0,0,0]];
      clues = {
        across: ['across1', 'across2'],
        down: ['down1', 'down2']
      }
      crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      gridNums = crossword.getGridNums()
    })

    it('returns an array of arrays, where each entry is a non-negative integer', () => {
      expect(gridNums).toEqual(jasmine.any(Array))
      expect(gridNums[0]).toEqual(jasmine.any(Array))
      for (var i = 0; i < gridNums.length; i++) {
        for (var j = 0; j < gridNums.length; j++) {
          expect(Number.isInteger(gridNums[i][j])).toEqual(true)
          expect(gridNums[i][j] >= 0).toEqual(true)
        }
      }
    })

    it('has the same dimensions as the grid', () => {
      expect(gridNums.length).toEqual(crossword.grid.length)
      expect(gridNums[0].length).toEqual(crossword.grid.length)
    })

    it('has a 0 in any positions that contains a period (black square)', () => {
      expect(gridNums[0][1]).toEqual(0)
      expect(gridNums[1][1]).toEqual(0)
      expect(gridNums[3][2]).toEqual(0)
      expect(gridNums[3][3]).toEqual(0)
    })

    it('has increasing numbers across rows', () => {
      let last = 0
      for (var i = 0; i < gridNums.length; i++) {
        for (var j = 0; j < gridNums.length; j++) {
          let currentNumber = gridNums[i][j];
          if (currentNumber !== 0) {
            expect(currentNumber > last).toEqual(true)
            last = currentNumber
          }
        }
      }
    })

    it('has a non-zero number in every non-black square in row 0 and column 0', () => {
      expect(gridNums[0][0]).not.toEqual(0)
      expect(gridNums[0][2]).not.toEqual(0)
      expect(gridNums[0][3]).not.toEqual(0)

      expect(gridNums[1][0]).not.toEqual(0)
      expect(gridNums[2][0]).not.toEqual(0)
      expect(gridNums[3][0]).not.toEqual(0)
    })

    it('has a non-zero number in other squares that start an across clue', () => {
      expect(gridNums[1][2]).not.toEqual(0)
    })

    it('has a non-zero number in other squares that start a down clue', () => {
      expect(gridNums[2][1]).not.toEqual(0)
    })

    it('has a zero in cells which do not start or end a clue', () => {
      expect(gridNums[1][3]).toEqual(0)
      expect(gridNums[2][2]).toEqual(0)
      expect(gridNums[2][3]).toEqual(0)
      expect(gridNums[3][1]).toEqual(0)
    })

    it('calculates and stores the result once for later retrieval', () => {
      expect(gridNums).toBe(crossword.getGridNums())
    })
  })

  describe('.getAcrossClues', () => {
    let crossword, square, clues, acrossClues
    beforeAll(() => {
      square =
        [['a','.','c','d'],
         ['e','.','g','h'],
         ['i','j','k','l'],
         ['m','n','.','.']];
      clues = {
        across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
        down: ['down1', 'down2', 'down3', 'down4']
      }
      crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      acrossClues = crossword.getAcrossClues()
    })

    it('returns an array of objects representing clues', () => {
      expect(acrossClues).toEqual(jasmine.any(Array))
      expect(acrossClues[0]).toEqual(jasmine.any(Object))
      expect(Number.isInteger(acrossClues[0]['gridNum'])).toEqual(true)
      expect(Number.isInteger(acrossClues[0]['row'])).toEqual(true)
      expect(Number.isInteger(acrossClues[0]['column'])).toEqual(true)
      expect(acrossClues[0]['text']).toEqual('across1')
    })

    it('returns one clue object for each across clue', () => {
      expect(acrossClues.length).toEqual(6)
    })

    it('does not modify the across clues array', () => {
      expect(crossword.clues['across']).toEqual(clues['across'])
    })

    it('includes across clues from column 0', () => {
      expect(acrossClues[2]).toEqual({
        gridNum: 4,
        row: 1,
        column: 0,
        text: 'across3'
      })
    })

    it('includes across clues from cells to the right of black squares', () => {
      expect(acrossClues[3]).toEqual({
        gridNum: 5,
        row: 1,
        column: 2,
        text: 'across4'
      })
    })

    it('calculates and stores the result once for later retrieval', () => {
      expect(acrossClues).toBe(crossword.getAcrossClues())
    })
  })

  describe('.getDownClues', () => {
    let crossword, square, clues, downClues
    beforeAll(() => {
      square =
        [['a','.','c','d'],
         ['e','.','g','h'],
         ['i','j','k','l'],
         ['m','n','.','.']];
      clues = {
        across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
        down: ['down1', 'down2', 'down3', 'down4']
      }
      crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      downClues = crossword.getDownClues()
    })

    it('returns an array of objects representing clues', () => {
      expect(downClues).toEqual(jasmine.any(Array))
      expect(downClues[0]).toEqual(jasmine.any(Object))
      expect(Number.isInteger(downClues[0]['gridNum'])).toEqual(true)
      expect(Number.isInteger(downClues[0]['row'])).toEqual(true)
      expect(Number.isInteger(downClues[0]['column'])).toEqual(true)
      expect(downClues[0]['text']).toEqual('down1')
    })

    it('returns one clue object for each down clue', () => {
      expect(downClues.length).toEqual(4)
    })

    it('does not modify the down clues array', () => {
      expect(crossword.clues['down']).toEqual(clues['down'])
    })

    it('includes down clues from row 0', () => {
      expect(downClues[1]).toEqual({
        gridNum: 2,
        row: 0,
        column: 2,
        text: 'down2'
      })
    })

    it('includes down clues from cells below black squares', () => {
      expect(downClues[3]).toEqual({
        gridNum: 7,
        row: 2,
        column: 1,
        text: 'down4'
      })
    })

    it('calculates and stores the result once for later retrieval', () => {
      expect(downClues).toBe(crossword.getDownClues())
    })
  })

  describe('.getSelectedClue', () => {
    let crossword, square, clues
    beforeAll(() => {
      square =
        [['a','.','c','d'],
         ['e','.','g','h'],
         ['i','j','k','l'],
         ['m','n','.','.']];
      clues = {
        across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
        down: ['down1', 'down2', 'down3', 'down4']
      }
      crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
    })

      describe('when the direction is across', () => {
        it('returns the clue when input row and column are the first cell of the clue', () => {
          expect(crossword.getSelectedClue('across', 2, 0)).toEqual({
            rowStart: 2,
            rowEnd: 2,
            columnStart: 0,
            columnEnd: 3,
            gridNum: 6
          })
          expect(crossword.getSelectedClue('across', 1, 2)).toEqual({
            rowStart: 1,
            rowEnd: 1,
            columnStart: 2,
            columnEnd: 3,
            gridNum: 5
          })
        })
        it('returns the clue when input row and column are the last cell of the clue', () => {
          expect(crossword.getSelectedClue('across', 2, 2)).toEqual({
            rowStart: 2,
            rowEnd: 2,
            columnStart: 0,
            columnEnd: 3,
            gridNum: 6
          })
        })
        it('returns the clue when input row and column are in the middle of the clue', () => {
          expect(crossword.getSelectedClue('across', 2, 2)).toEqual({
            rowStart: 2,
            rowEnd: 2,
            columnStart: 0,
            columnEnd: 3,
            gridNum: 6
          })
        })
      })

      describe('when the direction is down', () => {
        it('returns the clue when input row and column are the first cell of the clue',() => {
          expect(crossword.getSelectedClue('down', 0, 2)).toEqual({
            rowStart: 0,
            rowEnd: 2,
            columnStart: 2,
            columnEnd: 2,
            gridNum: 2
          })
          expect(crossword.getSelectedClue('down', 2, 1)).toEqual({
            rowStart: 2,
            rowEnd: 3,
            columnStart: 1,
            columnEnd: 1,
            gridNum: 7
          })
        })

        it('returns the clue when input row and column are the last cell of the clue', () => {
          expect(crossword.getSelectedClue('down', 2, 2)).toEqual({
            rowStart: 0,
            rowEnd: 2,
            columnStart: 2,
            columnEnd: 2,
            gridNum: 2
          })
        })
        it('returns the clue when input row and column are in the middle of the clue', () => {
          expect(crossword.getSelectedClue('down', 1, 2)).toEqual({
            rowStart: 0,
            rowEnd: 2,
            columnStart: 2,
            columnEnd: 2,
            gridNum: 2
          })
        })
      })
  })

  describe('.nextCell', () => {
    describe('directionless properties', () => {
      let crossword, square, clues
      beforeAll(() => {
        square =
          [['a','.','c','d'],
           ['e','.','g','h'],
           ['i','j','k','l'],
           ['m','n','.','.']];
        clues = {
          across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
          down: ['down1', 'down2', 'down3', 'down4']
        }
        crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      })

      it('returns undefined if not given a cardinal direction', () => {
        expect(crossword.nextCell('nw', 0, 0)).toBeUndefined()
      })

      it('returns an object with row and column index keys', () => {
        let nextCell = crossword.nextCell('up', 0, 0)
        expect(nextCell).toEqual(jasmine.any(Object))
        expect(nextCell['row']).toEqual(0)
        expect(nextCell['column']).toEqual(0)
      })
    })

    describe('when the direction is up', () => {
      let crossword, square, clues
      beforeAll(() => {
        square =
          [['a','.','c','d'],
           ['e','.','.','.'],
           ['i','j','.','l'],
           ['m','n','o','p']];
        clues = {
          across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
          down: ['down1', 'down2', 'down3', 'down4']
        }
        crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      })

      it('returns the same cell if starting on the top row', () => {
        expect(crossword.nextCell('up', 0, 2)).toEqual({
          row: 0,
          column: 2
        })
        expect(crossword.nextCell('up', 0, 3)).toEqual({
          row: 0,
          column: 3
        })
      })
      it('returns the same cell if all squares above are black', () => {
        expect(crossword.nextCell('up', 2, 1)).toEqual({
          row: 2,
          column: 1
        })
      })
      it('returns the next cell above, skipping over any black squares', () => {
        expect(crossword.nextCell('up', 3, 2)).toEqual({
          row: 0,
          column: 2
        })
        expect(crossword.nextCell('up', 2, 3)).toEqual({
          row: 0,
          column: 3
        })
      })
      it('returns the cell above if it is not a black cell', () => {
        expect(crossword.nextCell('up', 3, 0)).toEqual({
          row: 2,
          column: 0
        })
        expect(crossword.nextCell('up', 3, 3)).toEqual({
          row: 2,
          column: 3
        })
      })
    })

    describe('when the direction is down', () => {
      let crossword, square, clues
      beforeAll(() => {
        square =
          [['a','b','c','d'],
           ['e','f','.','.'],
           ['i','.','.','l'],
           ['m','.','o','p']];
        clues = {
          across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
          down: ['down1', 'down2', 'down3', 'down4']
        }
        crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      })

      it('returns the same cell if starting on the bottom row', () => {
        expect(crossword.nextCell('down', 3, 2)).toEqual({
          row: 3,
          column: 2
        })
      })
      it('returns the same cell if all squares below are black', () => {
        expect(crossword.nextCell('down', 1, 1)).toEqual({
          row: 1,
          column: 1
        })
      })
      it('returns the next cell below, skipping over any black squares', () => {
        expect(crossword.nextCell('down', 0, 3)).toEqual({
          row: 2,
          column: 3
        })
        expect(crossword.nextCell('down', 0, 2)).toEqual({
          row: 3,
          column: 2
        })
      })
      it('returns the cell below if it is not a black cell', () => {
        expect(crossword.nextCell('down', 0, 0)).toEqual({
          row: 1,
          column: 0
        })
      })
    })

    describe('when the direction is left', () => {
      let crossword, square, clues
      beforeAll(() => {
        square =
          [['.','b','c','.'],
           ['.','f','g','h'],
           ['.','j','.','l'],
           ['m','n','.','.']];
        clues = {
          across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
          down: ['down1', 'down2', 'down3', 'down4']
        }
        crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      })

      it('returns the last non black cell if starting on the top row and all cells to the left are black', () => {
        expect(crossword.nextCell('left', 0, 1)).toEqual({
          row: 3,
          column: 1
        })
      })
      it('returns the last non black cell of the row above if all cells to the left are black', () => {
        expect(crossword.nextCell('left', 1, 1)).toEqual({
          row: 0,
          column: 2
        })
        expect(crossword.nextCell('left', 2, 1)).toEqual({
          row: 1,
          column: 3
        })
      })
      it('returns the next cell to the left, skipping over any black squares', () => {
        expect(crossword.nextCell('left', 2, 3)).toEqual({
          row: 2,
          column: 1
        })
      })
      it('returns the cell to the left if it is an empty cell', () => {
        expect(crossword.nextCell('left', 3, 1)).toEqual({
          row: 3,
          column: 0
        })
      })
    })

    describe('when the direction is right', () => {
      let crossword, square, clues
      beforeAll(() => {
        square =
          [['.','b','c','d'],
           ['e','.','g','.'],
           ['h','j','k','.'],
           ['.','n','.','.']];
        clues = {
          across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
          down: ['down1', 'down2', 'down3', 'down4']
        }
        crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
      })

      it('returns the first non black cell if starting on the bottom row and all cells to the right are black', () => {
        expect(crossword.nextCell('right', 3, 1)).toEqual({
          row: 0,
          column: 1
        })
      })
      it('returns the first non black cell of the row below if all cells to the right are black', () => {
        expect(crossword.nextCell('right', 2, 2)).toEqual({
          row: 3,
          column: 1
        })
        expect(crossword.nextCell('right', 1, 2)).toEqual({
          row: 2,
          column: 0
        })
      })
      it('returns the next cell to the right, skipping over any black squares', () => {
        expect(crossword.nextCell('right', 1, 0)).toEqual({
          row: 1,
          column: 2
        })
      })
      it('returns the cell to the right if it is a non-black cell', () => {
        expect(crossword.nextCell('right', 0, 1)).toEqual({
          row: 0,
          column: 2
        })
      })
    })

  })

  describe('.nextCellWithinClue', () => {
    let crossword, square, clues
    beforeAll(() => {
      square =
        [['a','b','c','.'],
         ['e','f','g','h'],
         ['i','j','k','l'],
         ['.','n','o','p']];
      clues = {
        across: ['across1', 'across2', 'across3', 'across4', 'across5', 'across6'],
        down: ['down1', 'down2', 'down3', 'down4']
      }
      crossword = new Crossword(square, clues, Crossword.generateEmptyGrid(4))
    })

    describe('when given an across clue', () => {
      let clue = {
        rowStart: 0,
        rowEnd: 0,
        columnStart: 0,
        columnEnd: 2,
        gridNum: 1
      }
      let clue2 = {
        rowStart: 1,
        rowEnd: 1,
        columnStart: 0,
        columnEnd: 3,
        gridNum: 4
      }
      it('returns the next cell to the right when that cell is not the end of the clue', () => {
        expect(crossword.nextCellWithinClue(clue, 0, 0)).toEqual({
          row: 0,
          column: 1
        })
      })
      it('returns the first cell in the clue when the next cell to the right is black', () => {
        expect(crossword.nextCellWithinClue(clue, 0, 2)).toEqual({
          row: 0,
          column: 0
        })
      })
      it('returns the first cell in the clue when on the last cell of the row', () => {
        expect(crossword.nextCellWithinClue(clue2, 1, 3)).toEqual({
          row: 1,
          column: 0
        })
      })
    })
    describe('when given a down clue', () => {
      let clue = {
        rowStart: 1,
        rowEnd: 3,
        columnStart: 3,
        columnEnd: 3,
        gridNum: 5
      }
      let clue2 = {
        rowStart: 0,
        rowEnd: 2,
        columnStart: 0,
        columnEnd: 0,
        gridNum: 1
      }
      it('returns the cell below when that cell is not black', () => {
        expect(crossword.nextCellWithinClue(clue, 2, 3)).toEqual({
          row: 3,
          column: 3
        })
      })
      it('returns the first cell in the clue when given the last cell in the column', () => {
        expect(crossword.nextCellWithinClue(clue, 3, 3)).toEqual({
          row: 1,
          column: 3
        })
      })
      it('returns the first cell in the clue when cell below is black', () => {
        expect(crossword.nextCellWithinClue(clue2, 2, 0)).toEqual({
          row: 0,
          column: 0
        })
      })
    })
  })
})
