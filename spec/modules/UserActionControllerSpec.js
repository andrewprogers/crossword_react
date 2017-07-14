import UserActionController from '../../src/modules/UserActionController'
import Crossword from '../../src/modules/Crossword';

class FakeState {
  constructor(grid) {
    if (grid === undefined) {
      this.grid =
      [['a','b','c','d'],
       ['e','f','.','h'],
       ['i','j','k','l'],
       ['m','n','o','.']];
    } else {
      this.grid = grid;
    }
    this.clues = {
      across: ['across1', 'across2'],
      down: ['down1', 'down2']
    }
    this.userLetters = Crossword.generateEmptyGrid(this.grid.length)
    this.selectedCellRow = 0;
    this.selectedCellColumn = 0;
    this.clueDirection = 'across'
  }

  setCell(row, col) {
    this.selectedCellRow = row;
    this.selectedCellColumn = col;
    return;
  }
}

describe('UserActionController', () => {
  describe('.constructor', () => {
    let controller, fakeState
    beforeEach(() => {
      fakeState = new FakeState();
      controller = new UserActionController(fakeState)
    })

    it('creates a new UserActionController object', () => {
      expect(controller).toEqual(jasmine.any(UserActionController))
    })

    it('has a state property with copies of the application state', () => {
      expect(controller.state.grid).toEqual(fakeState.grid)
      expect(controller.state.grid).not.toBe(fakeState.grid)

      expect(controller.state.clues).toEqual(fakeState.clues)
      expect(controller.state.clues).not.toBe(fakeState.clues)

      expect(controller.state.userLetters).toEqual(fakeState.userLetters)
      expect(controller.state.userLetters).not.toBe(fakeState.userLetters)

      expect(controller.state.selectedCellRow).toEqual(jasmine.any(Number))
      expect(controller.state.selectedCellColumn).toEqual(jasmine.any(Number))
    })
  })

  describe('.keyPress returns an object for updating state', () => {
    let controller, grid, clues, fakeState
    beforeEach(() => {
      fakeState = new FakeState();
    })

    describe('backspace', () => {
      it('clears the current user letter when there is a letter in that cell', () => {
        fakeState.userLetters[0][0] = 'z'
        controller = new UserActionController(fakeState)
        let newState = controller.keyPress('Backspace');
        expect(newState.userLetters[0][0]).toEqual('')
      })
    })

    describe('spacebar', () => {
      it('changes clueDirection from across to down', () => {
        controller = new UserActionController(fakeState);
        let newState = controller.keyPress(' ');
        expect(newState.clueDirection).toEqual('down');
      })

      it('changes clueDirection from down to across', () => {
        fakeState.clueDirection = 'down'
        controller = new UserActionController(fakeState);
        let newState = controller.keyPress(' ');
        expect(newState.clueDirection).toEqual('across');
      })
    })

    describe('letter', () => {
      it('changes the letter in the current cell to the capital version of the pressed letter', () => {
        fakeState.userLetters[0][0] = 'z'
        let controller1 = new UserActionController(fakeState)
        let newState = controller1.keyPress('f');
        expect(newState.userLetters[0][0]).toEqual('F');

        fakeState.userLetters[0][1] = 'e'
        fakeState.setCell(0, 1);
        let controller2 = new UserActionController(fakeState)
        newState = controller2.keyPress('G');
        expect(newState.userLetters[0][1]).toEqual('G');
      })
    })

    describe('arrow keys', () => {
      let crossword
      beforeEach(() => {
        fakeState.setCell(2, 1);
        controller = new UserActionController(fakeState)
        crossword = new Crossword(fakeState.grid, fakeState.clues, fakeState.userLetters)
      })

      it('updates the cell position upward with ArrowUp', () => {
        let nextCell = crossword.nextCell('up', 2, 1)
        let expectedCell = {
          selectedCellRow: nextCell.row,
          selectedCellColumn: nextCell.column
        }
        let newState = controller.keyPress('ArrowUp');
        expect(newState).toEqual(expectedCell);
      })

      it('updates the cell position upward with ArrowDown', () => {
        let nextCell = crossword.nextCell('down', 2, 1)
        let expectedCell = {
          selectedCellRow: nextCell.row,
          selectedCellColumn: nextCell.column
        }
        let newState = controller.keyPress('ArrowDown');
        expect(newState).toEqual(expectedCell);
      })

      it('updates the cell position upward with ArrowLeft', () => {
        let nextCell = crossword.nextCell('left', 2, 1)
        let expectedCell = {
          selectedCellRow: nextCell.row,
          selectedCellColumn: nextCell.column
        }
        let newState = controller.keyPress('ArrowLeft');
        expect(newState).toEqual(expectedCell);
      })

      it('updates the cell position upward with ArrowRight', () => {
        let nextCell = crossword.nextCell('right', 2, 1)
        let expectedCell = {
          selectedCellRow: nextCell.row,
          selectedCellColumn: nextCell.column
        }
        let newState = controller.keyPress('ArrowRight');
        expect(newState).toEqual(expectedCell);
      })
    })
  })
})
